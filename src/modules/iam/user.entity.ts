import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true, type: 'varchar', nullable: false })
  @ApiPropertyOptional({
    type: String,
    description:
      'username in an alphanumeric format. Can contain the special characters `-` and `_`',
    example: 'user_name',
  })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  @ApiPropertyOptional({
    type: String,
    description: 'first name',
    example: 'John',
  })
  firstName: string;

  @Column({ type: 'varchar', nullable: false })
  @ApiPropertyOptional({
    type: String,
    description: 'last name',
    example: 'Doe',
  })
  lastName: string;

  @Column({ type: 'varchar', nullable: false, default: 'user' })
  @ApiProperty({
    type: String,
    description: 'role of the user',
    example: 'admin',
  })
  role: string;

  @Column({ type: 'varchar', nullable: false })
  @ApiHideProperty()
  password?: string;

  @Column({ type: 'varchar', nullable: false })
  @Exclude()
  @ApiHideProperty()
  salt?: string;

  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({
    type: String,
    description: 'serial used to register the user',
  })
  serial: string;

  @Column({ type: 'int', default: 0, nullable: false })
  @ApiProperty({
    type: Number,
    description: 'user balance',
  })
  balance: number;

  // @ManyToOne((type) => User, { eager: false, lazy: true })
  // @ApiProperty({
  //   type: String,
  //   description: 'id of user',
  //   example: '630cf16b72885f51a7510b76',
  // })
  // ref?: User;

  @ManyToOne(() => User, (user) => user.children)
  ref?: User;

  @OneToMany(() => User, (user) => user.ref)
  children: User[];
}
