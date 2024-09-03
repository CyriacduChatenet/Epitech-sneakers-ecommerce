import { Module } from '@nestjs/common';

import { StripeCustomerService } from './stripe-customer/stripe-customer.service';

@Module({
  providers: [StripeCustomerService],
  exports: [StripeCustomerService],
})
export class StripeModule {}
