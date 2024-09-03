import { Module } from '@nestjs/common';

import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from './customer.repository';
import { StripeModule } from '../stripe/stripe.module';

@Module({
  imports: [StripeModule],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
  exports: [CustomerService],
})
export class CustomerModule {}
