import { Size } from '../size/entities/size.entity';

export class CreateSneakerDto {
  external_id: number;
  brand: string;
  colorway: string;
  estimatedMarketValue: number;
  gender: string;
  image: {
    '360': string[];
    small: string;
    original: string;
    thumbnail: string;
  };
  links: {
    goat: string;
    stockX: string;
    flightClub: string;
    stadiumGoods: string;
  };
  name: string;
  releaseDate: string;
  releaseYear: string;
  retailPrice: number;
  silhouette: string;
  sku: string;
  story: string;
  publishedAt: Date;
  UID: string;
  stripe_product_id: string;
  stripe_price_id: string;
  sizes: Size[];
}
