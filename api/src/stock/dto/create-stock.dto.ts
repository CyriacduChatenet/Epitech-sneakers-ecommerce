import { IsInt, IsPositive } from 'class-validator';

import { Size } from '../../sneaker/size/entities/size.entity';
import { Sneaker } from '../../sneaker/entities/sneaker.entity';

export class CreateStockDto {
  sneaker?: Sneaker;
  size: Size;

  @IsInt()
  @IsPositive()
  quantity: number;
}
