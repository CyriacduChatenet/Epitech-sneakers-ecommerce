import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Headers,
  Body,
} from '@nestjs/common';

import { PaymentService } from '../payment/payment.service';

@Controller('webhook')
export class WebhoookController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('stripe')
  @HttpCode(HttpStatus.OK)
  async handleStripeWebhook(
    @Headers('stripe-signature') signature: string,
    @Body() rawBody: string,
  ): Promise<void> {
    await this.paymentService.handleStripeWebhook(signature, rawBody);
  }
}
