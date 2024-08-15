import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { Auth } from './auth.interface';
import {
  ChangePasswordDto,
  FilterUsersDto,
  JwtDto,
  LoginDto,
  SignupDto,
} from './dtos';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { GetAuth } from './get-auth.decorator';
import { Roles } from './role.decorator';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private service: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles('admin')
  @Get('')
  @ApiOperation({
    summary: 'search users',
    description: 'users can filtered by part of username',
  })
  @ApiOkResponse({
    description: 'List of Users, can filtered by username',
    type: [User],
  })
  async getFilteredUsers(
    @Query() filterUsersDto: FilterUsersDto,
  ): Promise<User[]> {
    return await this.service.getUsers(filterUsersDto);
  }

  @Post('')
  @ApiOperation({ summary: 'signup new user' })
  @ApiBody({ type: SignupDto })
  async signUp(@Body() signupDto: SignupDto): Promise<void> {
    await this.service.signup(signupDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'login with username/password' })
  @ApiOkResponse({ description: 'JWT Bearer token', type: JwtDto })
  @HttpCode(200)
  async signInWithPassword(@Body() singInDto: LoginDto): Promise<JwtDto> {
    return await this.service.login(singInDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('/me/password')
  @HttpCode(200)
  @ApiOperation({ summary: 'change password' })
  async changePassword(
    @GetAuth() auth: Auth,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    return await this.service.changePassword(auth, changePasswordDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles('admin')
  @Patch(':userId/password')
  @ApiOperation({ summary: 'reset password by admin' })
  async resetPassword(
    @GetAuth() actor: Auth,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<void> {
    return await this.service.resetPassword(actor, userId, resetPasswordDto);
  }
}
