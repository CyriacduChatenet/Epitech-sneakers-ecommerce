import { IsArray, IsString } from 'class-validator';

export class CreateCheckoutDto {
  @IsString()
  customer_id: string;

  @IsArray()
  shoppingCart: {
    price_id: string;
    quantity: number;
  }[];
}
