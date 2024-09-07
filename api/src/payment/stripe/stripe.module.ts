import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { StripeCustomerService } from './stripe-customer/stripe-customer.service';
import { StripeProductService } from './stripe-product/stripe-product.service';
import { StripeProductController } from './stripe-product/stripe-product.controller';
import { StripeInvoiceService } from './stripe-invoice/stripe-invoice.service';
import { StripeCheckoutService } from './stripe-checkout/stripe-checkout.service';

@Module({
  imports: [HttpModule],
  providers: [
    StripeCustomerService,
    StripeProductService,
    StripeInvoiceService,
    StripeCheckoutService,
  ],
  exports: [
    StripeCustomerService,
    StripeProductService,
    StripeInvoiceService,
    StripeCheckoutService,
  ],
  controllers: [StripeProductController],
})
export class StripeModule {}
