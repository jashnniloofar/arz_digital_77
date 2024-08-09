import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Matches } from 'class-validator';
import { passwordRegex } from '../../../shared/pattern';

export class LoginDto {
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({
    type: String,
    description: 'The user name or email address',
    example: 'admin',
  })
  username: string;

  @IsString()
  @Matches(passwordRegex, {
    message:
      'password has minimum 8 in length and must contains at least 1 upper case letter and 1 lower case letter and 1 number or special character',
  })
  @ApiProperty({
    type: String,
    description:
      'password of user has minimum 8 in length and contains at least one upper case letter, one lower case letter, one digit and one special character',
    example: 'K76e9N=H5YUaAmT',
  })
  password: string;
}
