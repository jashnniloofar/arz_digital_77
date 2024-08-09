import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as config from 'config';
import { Model } from 'mongoose';
import { hashSecret } from '../../utils/crypto';
import { SerialsService } from '../serial/serials.service';
import { Auth } from './auth.interface';
import { ChangePasswordDto, FilterUsersDto, JwtDto, SignupDto } from './dtos';
import { LoginDto } from './dtos/login.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { JWTService } from './jwt.service';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name) private model: Model<UserDocument>,
    private jwtService: JWTService,
    @Inject(forwardRef(() => SerialsService))
    private readonly serialsService: SerialsService,
  ) {
    this._initAdmin();
  }

  async getUsers(filterUsersDto: FilterUsersDto): Promise<User[]> {
    const filter: any = filterUsersDto;
    if (filterUsersDto.username) {
      filter.username = new RegExp(`${filterUsersDto.username}`);
    }

    return this.model.find(filter);
  }

  async signup(signupDto: SignupDto): Promise<UserDocument> {
    const { hashed, salt } = await hashSecret(signupDto.password);
    const user = new this.model(signupDto);
    user.salt = salt;
    user.password = hashed;
    if (signupDto.ref) {
      user.ref = await this.getUserByUsername(signupDto.ref);
    }
    await user.save();
    try {
      await this.serialsService.useCode(signupDto.serial);
    } catch (error) {
      await user.deleteOne();
      this.logger.error(`Using invalid serial: ${signupDto.serial}`);
      throw error;
    }
    this.logger.log(`User ${user.username} signed up`);
    await this.sendRewards(user);
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const deleteResult = await this.model.deleteOne({ _id: id });
    if (deleteResult.deletedCount === 0) {
      throw new NotFoundException(`User not found`);
    }
  }

  async sendRewards(user: User): Promise<void> {
    const rewards: number[] = config.get<number[]>('rewards');
    let currentUser = user;
    for (const reward of rewards) {
      await this.model.updateOne(
        { _id: currentUser.id },
        { $inc: { balance: reward } },
      );
      this.logger.log(`User ${currentUser.username} got ${reward} reward`);
      currentUser = await this.model.findOne({ _id: currentUser.ref });
      if (!currentUser) break;
    }
  }

  async login(loginDto: LoginDto): Promise<JwtDto> {
    const { username, password } = loginDto;
    const user = await this.comparePassword(username, password);
    if (user && user !== null) {
      return this.jwtService.generateJwtToken(user.id, {
        username,
        role: user.role,
      });
    } else {
      throw new UnauthorizedException('Invalid username or password');
    }
  }

  async resetPassword(
    actor: Auth,
    userId: string,
    resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    if (actor.id === userId) {
      throw new BadRequestException(
        'Can not reset own password, try to change password instead',
      );
    }
    const user = await this.getUserById(userId);
    const { hashed, salt } = await hashSecret(resetPasswordDto.newPassword);
    return await this.model.findOneAndUpdate(
      { _id: user.id },
      { password: hashed, salt },
    );
  }

  async getUserByUsername(username: string): Promise<UserDocument> {
    return await this.model.findOne({ username });
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.model.findById(id);
    if (user === null) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  async comparePassword(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.model
      .findOne({ $or: [{ username }] })
      .select('+password +salt');
    if (user && user !== null) {
      const result = await hashSecret(password, user.salt);
      if (result.hashed === user.password) return user;
    }
    return null;
  }

  async changePassword(
    auth: Auth,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const { newPassword, oldPassword } = changePasswordDto;
    if (newPassword === oldPassword) {
      throw new BadRequestException(
        'Password and old password must not be same',
      );
    }
    const user = await this.comparePassword(auth.username, oldPassword);
    if (!user || user === null) {
      throw new UnauthorizedException('Invalid old password');
    }
    const { hashed, salt } = await hashSecret(newPassword);
    return await this.model.findOneAndUpdate(
      { _id: user.id },
      { password: hashed, salt },
    );
  }

  private async _initAdmin() {
    this.logger.log('Adding initial admin...');
    const username = config.get<string>('server.initialAdmin.username');
    let admin = await this.getUserByUsername(username);
    if (!admin) {
      const password = config.get<string>('server.initialAdmin.password');
      if (!password || password === '')
        throw new Error(
          "Initial admin's password should not be empty, please set in config file",
        );
      admin = await this.signup({
        username,
        password,
        firstName: 'Admin',
        lastName: 'Admin',
        serial: '0',
      });
      admin.role = 'admin';
      await admin.save();
    }
    this.logger.log('Initial admin added');
  }
}
