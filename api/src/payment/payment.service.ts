import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { MailService } from '../mail/mail.service';
import { StripeCustomerService } from './stripe/stripe-customer/stripe-customer.service';
import { StripeInvoiceService } from './stripe/stripe-invoice/stripe-invoice.service';
import { StripeCheckoutService } from './stripe/stripe-checkout/stripe-checkout.service';
import { SneakerService } from '../sneaker/sneaker.service';
import { StockService } from '../stock/stock.service';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private mailService: MailService,
    private sneakerService: SneakerService,
    private stockService: StockService,
    private stripeCustomerService: StripeCustomerService,
    private stripeInvoiceService: StripeInvoiceService,
    private stripeCheckoutService: StripeCheckoutService,
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
        invoice_creation: { enabled: true },
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
        stripeCustomer = await this.stripeCustomerService.findOne(
          session.customer as string,
        );
      } else if (event.type === 'invoice.payment_succeeded') {
        const invoice = event.data.object;
        const invoice_pdf_url = invoice.invoice_pdf;

        if (!stripeCustomer) {
          stripeCustomer = await this.stripeCustomerService.findOne(
            invoice.customer as string,
          );
        }

        const invoiceBuffer =
          await this.stripeInvoiceService.download(invoice_pdf_url);

        if (stripeCustomer && 'email' in stripeCustomer) {
          try {
            await this.mailService.sendOrderConfirmationMail(
              stripeCustomer.email,
              invoiceBuffer,
            );
          } catch (error) {
            throw new HttpException(`Failed to send email : ${error}`, 403);
          }
        }
      } else if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const lineItems = await this.stripeCheckoutService.listItems(
          session.id,
        );

        // Update stock quantity
        lineItems.data.forEach(async (product) => {
          const product_name = product.description;
          const sneaker = await this.sneakerService.findOneByName(product_name);
          const stock_id = sneaker.stocks[0].id;
          await this.stockService.update(stock_id, {
            quantity: sneaker.stocks[0].quantity - product.quantity,
            sneaker: sneaker.stocks[0].sneaker,
            size: sneaker.stocks[0].size,
          });
        });

        console.log('List of items in the checkout session', lineItems);
        console.log('Checkout session completed', session);
      }
    } catch (err) {
      throw new HttpException('Webhook Error', HttpStatus.BAD_REQUEST);
    }
  }
}
