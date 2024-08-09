import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Matches } from 'class-validator';
import { passwordRegex, usernameRegex } from '../../../shared/pattern';

export class SignupDto {
  @IsString()
  @Matches(usernameRegex)
  @ApiProperty({
    type: String,
    description:
      'username in an alphanumeric format. Can contain the special characters `-` and `_`',
    example: 'david95',
  })
  @Transform(({ value }) => value.toLowerCase())
  username: string;

  @IsString()
  @Matches(passwordRegex, {
    message:
      'password has minimum 8 in length and must contains at least 1 upper case letter and 1 lower case letter and 1 number or special character',
  })
  @ApiProperty({
    type: String,
    description: `password`,
    example: 'K>cWNK1PLR3jWr%-7',
  })
  password: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'first name',
    example: 'David',
  })
  firstName: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'last name',
    example: 'Doe',
  })
  lastName: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'serial used to register the user',
    example: '6156f850408bd0',
  })
  serial: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'referred by',
  })
  ref?: string;
}
