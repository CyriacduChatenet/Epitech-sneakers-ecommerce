import { IsInt, IsPositive } from 'class-validator';

import { Sneaker } from '../../sneaker/entities/sneaker.entity';
import { Size } from '../../sneaker/size/entities/size.entity';

export class UpdateStockDto {
  sneaker: Sneaker;
  size: Size;

  @IsInt()
  @IsPositive()
  readonly quantity?: number;
}
