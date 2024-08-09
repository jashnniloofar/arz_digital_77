import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SerialsModule } from '../serial/serials.module';
import { JWTService } from './jwt.service';
import { User, UserSchema } from './user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    SerialsModule,
  ],
  controllers: [UsersController],
  providers: [JWTService, UsersService],
  exports: [JWTService, UsersService],
})
export class IamModule {}
