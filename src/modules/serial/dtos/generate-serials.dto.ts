import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GenerateSerialsDto {
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: `number of serials to be generated`,
    example: 10,
  })
  count: number;
}
