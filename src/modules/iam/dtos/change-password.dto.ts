import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { passwordRegex } from '../../../shared/pattern';

export class ChangePasswordDto {
  @IsString()
  @Matches(passwordRegex, {
    message:
      'password has minimum 8 in length and must contains at least 1 upper case letter and 1 lower case letter and 1 number or special character',
  })
  @ApiProperty({
    type: String,
    description: `user's new password`,
    example: 'K>cWNK1PLR3jWr%-7',
  })
  newPassword: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: `user's old password`,
    example: 'M(H*v*8Rn]#eDQ',
  })
  oldPassword: string;
}
