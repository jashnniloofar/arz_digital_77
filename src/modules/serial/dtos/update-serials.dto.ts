import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { SerialStatus } from '../serial-status.enum';

export class UpdateSerialsDto {
  @IsEnum(SerialStatus)
  @ApiProperty({
    type: String,
    enum: SerialStatus,
    description: 'status',
    example: SerialStatus.active,
  })
  status: SerialStatus;
}
