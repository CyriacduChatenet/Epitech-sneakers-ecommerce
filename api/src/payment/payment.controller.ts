import { Body, Controller, Param, Post } from '@nestjs/common';

import { PaymentService } from './payment.service';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('checkout/:customerId')
  @Roles(Role.User, Role.Admin)
  async createCheckoutSession(
    @Param('customerId') customerId: string,
    @Body() { amount, price_id }: { amount: number; price_id: string },
  ): Promise<any> {
    const createCheckoutDto: {
      currency: string;
      amount: number;
      customer_id: string;
      price_id: string;
    } = {
      currency: 'eur',
      amount,
      customer_id: customerId,
      price_id: price_id,
    };
    console.log(createCheckoutDto);
    const sessionId =
      await this.paymentService.createCheckoutSession(createCheckoutDto);
    return { sessionId };
  }
}
