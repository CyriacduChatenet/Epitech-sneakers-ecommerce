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
    @Body() { amount }: { amount: number },
  ): Promise<{ sessionId: string }> {
    const createCheckoutDto: {
      currency: string;
      amount: number;
      customer: string;
    } = {
      currency: 'eur',
      amount,
      customer: customerId,
    };
    const sessionId =
      await this.paymentService.createCheckoutSession(createCheckoutDto);
    return { sessionId };
  }
}
