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
  ): Promise<any> {
    // try {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Méthodes de paiement acceptées (ici, uniquement carte)
      customer: createCheckoutDto.customer_id, // Identifiant du client Stripe
      line_items: [
        {
          price: createCheckoutDto.price_id, // Identifiant du prix dans Stripe
          quantity: 1, // Quantité d'articles
        },
      ],
      mode: 'payment', // Changement du mode à 'payment' pour un paiement unique
      success_url: `${this.configService.get('CLIENT_APP_URL')}/payment/success`, // URL de succès après paiement
      cancel_url: `${this.configService.get('CLIENT_APP_URL')}/payment/cancel`, // URL d'annulation après paiement
    });

    console.log(session);
    return session.id;

    // } catch (err) {
    //   throw new HttpException('Failed to recieve payment', 402);
    // }
  }
}
