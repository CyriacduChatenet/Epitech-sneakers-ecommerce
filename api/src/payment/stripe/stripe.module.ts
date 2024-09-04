import { Module } from '@nestjs/common';

import { StripeCustomerService } from './stripe-customer/stripe-customer.service';
import { StripeProductService } from './stripe-product/stripe-product.service';
import { StripeProductController } from './stripe-product/stripe-product.controller';

@Module({
  providers: [StripeCustomerService, StripeProductService],
  exports: [StripeCustomerService, StripeProductService],
  controllers: [StripeProductController],
})
export class StripeModule {}
