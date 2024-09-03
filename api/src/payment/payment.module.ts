import { Module } from '@nestjs/common';
import { StripeModule as NestStripeModule } from 'nestjs-stripe';
import { ConfigModule } from '@nestjs/config';

import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MailModule } from '../mail/mail.module';
import { CustomerModule } from './customer/customer.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    NestStripeModule.forRoot({
      apiKey: process.env.STRIPE_API_KEY,
      apiVersion: '2024-06-20',
    }),
    MailModule,
    CustomerModule,
    StripeModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
