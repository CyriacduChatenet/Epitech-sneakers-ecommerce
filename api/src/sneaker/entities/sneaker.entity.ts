import { Timestamp } from 'src/utils/timestamps.util';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sneaker extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
