import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeCustomerService {
  private stripe: Stripe;

  constructor(configService: ConfigService) {
    this.stripe = new Stripe(configService.get<string>('STRIPE_API_KEY'), {
      apiVersion: '2024-06-20',
    });
  }

  async createStripeCustomer(stripeCredentials: {
    email: string;
    name: string;
  }) {
    return await this.stripe.customers.create({
      email: stripeCredentials.email,
      name: stripeCredentials.name,
    });
  }

  async findAll() {
    return await this.stripe.customers.list();
  }

  async findOne(customerId: string) {
    return await this.stripe.customers.retrieve(customerId);
  }

  async update(customerId: string, email: string) {
    return await this.stripe.customers.update(customerId, { email });
  }

  async delete(customerId: string) {
    return await this.stripe.customers.del(customerId);
  }

  async addPaymentMethod(customerId: string, card): Promise<any> {
    try {
      const paymentMethod = await this.stripe.paymentMethods.create({
        type: 'card',
        card,
      });

      await this.stripe.paymentMethods.attach(paymentMethod.id, {
        customer: customerId,
      });

      const customer = await this.stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethod.id,
        },
      });

      return customer;
    } catch (err) {
      throw new HttpException(err.message, 402);
    }
  }
}
