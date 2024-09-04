import { HttpException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

import { CreateCheckoutDto } from './dto/create-checkout.dto';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(configService.get<string>('STRIPE_API_KEY'), {
      apiVersion: '2024-06-20',
    });
  }

  async createCheckoutSession(
    createCheckoutDto: CreateCheckoutDto,
  ): Promise<string> {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer: createCheckoutDto.customer_id,
        line_items: [
          {
            price: createCheckoutDto.price_id,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        subscription_data: {
          trial_period_days: 30,
        },
        success_url: `${this.configService.get('CLIENT_APP_URL')}/payment/success`,
        cancel_url: `${this.configService.get('CLIENT_APP_URL')}/payment/cancel`,
      });

      console.log(session);

      return session.id;
    } catch (err) {
      throw new HttpException('Failed to recieve payment', 402);
    }
  }
}
