import { ApiProperty } from '@nestjs/swagger';

export class BaseSchema {
  @ApiProperty({
    type: String,
    description: 'unique identifier',
    example: '6156f850408bd03b409e7ef6',
  })
  id: string;

  @ApiProperty({
    type: Date,
    description: 'create date',
    example: '2021-10-22T16:37:35.090+00:00',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'update date',
    example: '2021-10-23T16:37:42.190+00:00',
  })
  updatedAt: Date;
}

export const baseSchemaConfig = {
  timestamps: true,
  toJSON: {
    transform: (doc: any, ret: any) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
};
