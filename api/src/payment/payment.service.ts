import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { MailService } from '../mail/mail.service';
import { StripeCustomerService } from './stripe/stripe-customer/stripe-customer.service';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private mailService: MailService,
    private stripeCustomer: StripeCustomerService,
  ) {
    this.stripe = new Stripe(configService.get<string>('STRIPE_API_KEY'), {
      apiVersion: '2024-06-20',
    });
  }

  async createCheckoutSession(
    createCheckoutDto: CreateCheckoutDto,
  ): Promise<any> {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer: createCheckoutDto.customer_id,
        line_items: createCheckoutDto.shoppingCart.map((item) => ({
          price: item.price_id,
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${this.configService.get('CLIENT_APP_URL')}/payment/success`,
        cancel_url: `${this.configService.get('CLIENT_APP_URL')}/payment/cancel`,
      });

      return session.id;
    } catch (err) {
      throw new HttpException('Failed to recieve payment', 402);
    }
  }

  async handleStripeWebhook(signature: string, event: any): Promise<void> {
    let stripeCustomer:
      | Stripe.Response<Stripe.Customer>
      | Stripe.DeletedCustomer;

    try {
      if (event.type === 'payment_intent.created') {
        const session = event.data.object as Stripe.Checkout.Session;
        // Handle successful payment here
        stripeCustomer = await this.stripeCustomer.findOne(
          session.customer as string,
        );

        console.log(event.data.object);

        if (stripeCustomer && 'email' in stripeCustomer) {
          await this.mailService.sendOrderConfirmationMail(
            stripeCustomer.email,
          );
        }
      }
    } catch (err) {
      throw new HttpException('Webhook Error', HttpStatus.BAD_REQUEST);
    }
  }
}
