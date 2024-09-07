import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeInvoiceService {
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
    return await this.stripe.invoices.list();
  }

  async findOne(invoiceId: string) {
    return await this.stripe.invoices.retrieve(invoiceId);
  }

  async delete(invoiceId: string) {
    return await this.stripe.invoices.del(invoiceId);
  }

  async download(invoice_pdf_url: string): Promise<Buffer> {
    const response = await this.httpService
      .get(invoice_pdf_url, {
        responseType: 'arraybuffer',
      })
      .toPromise();

    return Buffer.from(response.data);
  }
}
