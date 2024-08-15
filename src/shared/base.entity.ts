import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @ApiProperty({
    type: String,
    description: 'unique identifier',
    example: '6156f850408bd03b409e7ef6',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: Date,
    description: 'create date',
    example: '2021-10-22T16:37:35.090+00:00',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'update date',
    example: '2021-10-23T16:37:42.190+00:00',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
