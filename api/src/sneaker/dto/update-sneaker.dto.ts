import { PartialType } from '@nestjs/mapped-types';

import { CreateSneakerDto } from './create-sneaker.dto';
import { Size } from '../size/entities/size.entity';

export class UpdateSneakerDto extends PartialType(CreateSneakerDto) {
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
  sizes?: Size[];
}
