import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { BaseSchema, baseSchemaConfig } from '../../shared/base.schema';
import { SerialStatus } from './serial-status.enum';

@Schema(baseSchemaConfig)
export class Serial extends BaseSchema {
  @Prop({ unique: true })
  @ApiPropertyOptional({
    type: String,
    description: 'serial code',
    example: '1234567890',
  })
  code: string;

  @Prop({
    type: String,
    enum: SerialStatus,
    required: true,
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

export type SerialDocument = Serial & Document;

export const SerialSchema = SchemaFactory.createForClass(Serial);
