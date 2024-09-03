import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Timestamp } from '../../utils/timestamps.util';
import { Role } from '../../enums/role.enum';
import { ResetPasswordToken } from 'src/auth/reset-password-token/entities/reset-password-token.entity';

@Entity()
export class User extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
    nullable: false,
  })
  roles: Role;

  @OneToOne(() => ResetPasswordToken)
  @JoinColumn()
  resetPasswordToken: ResetPasswordToken;
}
