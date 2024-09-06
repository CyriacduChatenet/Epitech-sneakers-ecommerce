import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Timestamp } from '../../../utils/timestamps.util';
import { Sneaker } from '../../../sneaker/entities/sneaker.entity';

@Entity()
export class Size extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  size: string;

  @ManyToMany(() => Sneaker, (sneaker) => sneaker.sizes)
  sneakers: Sneaker[];
}
