import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeCheckoutService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    this.stripe = new Stripe(configService.get<string>('STRIPE_API_KEY'), {
      apiVersion: '2024-06-20',
    });
  }

  async findAll() {
    return await this.stripe.checkout.sessions.list();
  }

  async findOne(CheckoutId: string) {
    return await this.stripe.checkout.sessions.retrieve(CheckoutId);
  }

  async listItems(CheckoutId: string) {
    return await this.stripe.checkout.sessions.listLineItems(CheckoutId);
  }
}
