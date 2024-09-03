import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Timestamp } from '../../utils/timestamps.util';
import { Role } from '../../enums/role.enum';
import { ResetPasswordToken } from '../../auth/reset-password-token/entities/reset-password-token.entity';
import { Customer } from '../../payment/customer/entities/customer.entity';

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

  @OneToOne(() => Customer, (customer) => customer.user, { cascade: true })
  @JoinColumn()
  customer: Customer;
}
