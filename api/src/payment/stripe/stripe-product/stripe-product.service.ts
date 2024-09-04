import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeProductService {
  private stripe: Stripe;

  constructor(configService: ConfigService) {
    this.stripe = new Stripe(configService.get<string>('STRIPE_API_KEY'), {
      apiVersion: '2024-06-20',
    });
  }

  async createStripeProduct(stripeCredentials: {
    name: string;
    description: string;
    images: string[];
    price: number;
  }) {
    return await this.stripe.products.create({
      name: stripeCredentials.name,
      description: stripeCredentials.description,
      images: stripeCredentials.images,
      default_price_data: {
        currency: 'eur',
        unit_amount: stripeCredentials.price,
      },
    });
  }

  async findAll() {
    return await this.stripe.products.list();
  }

  async findOne(productId: string) {
    return await this.stripe.products.retrieve(productId);
  }

  async delete(productId: string) {
    return await this.stripe.products.del(productId);
  }
}
