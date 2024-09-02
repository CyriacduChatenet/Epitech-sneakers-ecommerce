import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sneaker {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
