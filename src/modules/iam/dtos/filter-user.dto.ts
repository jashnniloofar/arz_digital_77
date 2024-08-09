import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterUsersDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'Part of username',
    example: 'admin',
  })
  username?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'role of the user',
    example: 'admin',
  })
  role?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'referred by',
    example: 'admin',
  })
  ref?: string;
}
