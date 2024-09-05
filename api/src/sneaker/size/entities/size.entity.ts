import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Timestamp } from '../../../utils/timestamps.util';
import { Sneaker } from 'src/sneaker/entities/sneaker.entity';

@Entity()
export class Size extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  size: string;

  // Correction: ManyToOne relation between Size and Sneaker
  @ManyToOne(() => Sneaker, (sneaker) => sneaker.sizes, { onDelete: 'CASCADE' })
  sneaker: Sneaker;
}
