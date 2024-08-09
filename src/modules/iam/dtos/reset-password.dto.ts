import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { passwordRegex } from '../../../shared/pattern';

export class ResetPasswordDto {
  @IsString()
  @Matches(passwordRegex, {
    message:
      'password has minimum 8 in length and must contains at least 1 upper case letter and 1 lower case letter and 1 number or special character',
  })
  @ApiProperty({
    type: String,
    description:
      'password has minimum 8 in length and must contains at least 1 upper case letter and 1 lower case letter and 1 number or special character',
    example: 'CrD?b!+=5va+Vh$M',
  })
  newPassword: string;
}
