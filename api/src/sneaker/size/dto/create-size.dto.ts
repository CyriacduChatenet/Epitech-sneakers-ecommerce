import { Stock } from '../../../stock/entities/stock.entity';

export class CreateSizeDto {
  size: string;
  stocks: Stock[];
}
