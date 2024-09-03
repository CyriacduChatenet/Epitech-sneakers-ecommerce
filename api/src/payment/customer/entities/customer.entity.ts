import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../../../user/entities/user.entity';
import { Timestamp } from '../../../utils/timestamps.util';

@Entity()
export class Customer extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: false })
  stripeId: string;

  @OneToOne(() => User, (user) => user.customer)
  user: User;
}
