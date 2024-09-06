import { Sneaker } from '../../../sneaker/entities/sneaker.entity';

export class CreateSizeDto {
  size: string;
  sneakers: Sneaker[];
}
