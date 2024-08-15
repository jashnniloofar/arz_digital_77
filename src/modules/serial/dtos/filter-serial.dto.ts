import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { SerialStatus } from '../serial-status.enum';

export class FilterSerialsDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    enum: SerialStatus,
    description: 'status',
    example: SerialStatus.active,
  })
  status?: SerialStatus;
}
