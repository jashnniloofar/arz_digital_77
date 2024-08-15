import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';
import { SerialStatus } from './serial-status.enum';

@Entity()
export class Serial extends BaseEntity {
  @Column({ unique: true, type: 'varchar', nullable: false })
  @ApiPropertyOptional({
    type: String,
    description: 'serial code',
    example: '1234567890',
  })
  code: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: SerialStatus.active,
  })
  @ApiProperty({
    type: String,
    enum: SerialStatus,
    description: 'status',
    example: SerialStatus.active,
  })
  status: SerialStatus;
}
