import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SerialsModule } from '../serial/serials.module';
import { JWTService } from './jwt.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SerialsModule],
  controllers: [UsersController],
  providers: [JWTService, UsersService],
  exports: [JWTService, UsersService],
})
export class IamModule {}
