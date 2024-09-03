import { IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  email?: string;

  @IsString()
  name?: string;

  @IsString()
  stripeId?: string;

  @IsString()
  address?: string;
}
