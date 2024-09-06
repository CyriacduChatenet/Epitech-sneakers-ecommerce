import { Stock } from '../../../stock/entities/stock.entity';

export class UpdateSizeDto {
  size: string;
  stocks: Stock[];
}
