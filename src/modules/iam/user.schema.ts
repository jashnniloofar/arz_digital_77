import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BaseSchema, baseSchemaConfig } from '../../shared/base.schema';

@Schema(baseSchemaConfig)
export class User extends BaseSchema {
  @Prop({ unique: true })
  @ApiPropertyOptional({
    type: String,
    description:
      'username in an alphanumeric format. Can contain the special characters `-` and `_`',
    example: 'user_name',
  })
  username: string;

  @Prop({ required: true })
  @ApiPropertyOptional({
    type: String,
    description: 'first name',
    example: 'John',
  })
  firstName: string;

  @Prop({ required: true })
  @ApiPropertyOptional({
    type: String,
    description: 'last name',
    example: 'Doe',
  })
  lastName: string;

  @Prop({ required: true, default: 'user' })
  @ApiProperty({
    type: String,
    description: 'role of the user',
    example: 'admin',
  })
  role: string;

  @Prop({ select: false })
  @ApiHideProperty()
  password?: string;

  @Prop({ select: false })
  @ApiHideProperty()
  salt?: string;

  @Prop({ required: true })
  @ApiProperty({
    type: String,
    description: 'serial used to register the user',
  })
  serial: string;

  @Prop({ required: true, default: 0 })
  @ApiProperty({
    type: Number,
    description: 'user balance',
  })
  balance: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  @ApiProperty({
    type: String,
    description: 'id of user',
    example: '630cf16b72885f51a7510b76',
  })
  ref?: User;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
