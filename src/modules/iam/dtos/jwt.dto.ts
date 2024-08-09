import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class JwtDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'JWT token',
    example: 'eyJhbGciOiJSUzI1N...',
  })
  accessToken: string;
}
