import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Timestamp } from '../../../utils/timestamps.util';
import { Stock } from '../../../stock/entities/stock.entity';

@Entity()
export class Size extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  size: string;

  @OneToMany(() => Stock, (stock) => stock.size)
  stocks: Stock[];
}
