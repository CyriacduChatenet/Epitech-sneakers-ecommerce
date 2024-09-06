import { Sneaker } from '../../../sneaker/entities/sneaker.entity';

export class UpdateSizeDto {
  size: string;
  sneakers: Sneaker[];
}
