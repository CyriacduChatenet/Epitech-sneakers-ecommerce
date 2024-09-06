import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MailModule } from '../mail/mail.module';
import { CustomerModule } from './customer/customer.module';
import { StripeModule } from './stripe/stripe.module';
import { OrderService } from './order/order.service';

@Module({
  imports: [ConfigModule.forRoot(), MailModule, CustomerModule, StripeModule],
  controllers: [PaymentController],
  providers: [PaymentService, OrderService],
  exports: [PaymentService],
})
export class PaymentModule {}
