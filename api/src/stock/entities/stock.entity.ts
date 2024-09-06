import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Timestamp } from '../../utils/timestamps.util';
import { Sneaker } from '../../sneaker/entities/sneaker.entity';
import { Size } from '../../sneaker/size/entities/size.entity';

@Entity()
export class Stock extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Sneaker, (sneaker) => sneaker.stocks)
  @JoinColumn()
  sneaker: Sneaker;

  @ManyToOne(() => Size, (size) => size.stocks)
  @JoinColumn()
  size: Size;

  @Column()
  quantity: number;
}
