import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Timestamp } from '../../utils/timestamps.util';
import { Stock } from 'src/stock/entities/stock.entity';

@Entity()
export class Sneaker extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, unique: true })
  external_id: number;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  colorway: string;

  @Column('decimal', { nullable: true })
  estimatedMarketValue: number;

  @Column({ nullable: true })
  gender: string;

  @Column('json', { nullable: true })
  image: {
    '360': string[];
    small: string;
    original: string;
    thumbnail: string;
  };

  @Column('json', { nullable: true })
  links: {
    goat: string;
    stockX: string;
    flightClub: string;
    stadiumGoods: string;
  };

  @Column()
  name: string;

  @Column({ type: 'date' })
  releaseDate: string;

  @Column()
  releaseYear: string;

  @Column('decimal')
  retailPrice: number;

  @Column()
  silhouette: string;

  @Column()
  sku: string;

  @Column('text')
  story: string;

  @Column({ type: 'timestamp' })
  publishedAt: Date;

  @Column()
  UID: string;

  @Column()
  stripe_product_id: string;

  @Column()
  stripe_price_id: string;

  @OneToMany(() => Stock, (stock) => stock.sneaker)
  stocks: Stock[];
}
