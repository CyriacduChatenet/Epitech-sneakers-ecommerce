import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MailModule } from '../mail/mail.module';
import { CustomerModule } from './customer/customer.module';
import { StripeModule } from './stripe/stripe.module';
import { WebhoookController } from '../webhoook/webhoook.controller';
import { StockModule } from '../stock/stock.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailModule,
    CustomerModule,
    StripeModule,
    StockModule,
  ],
  controllers: [PaymentController, WebhoookController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
