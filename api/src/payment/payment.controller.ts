import { Body, Controller, Param, Post } from '@nestjs/common';

import { PaymentService } from './payment.service';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { CreateCheckoutDto } from './dto/create-checkout.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('checkout/:customerId')
  @Roles(Role.User, Role.Admin)
  async createCheckoutSession(
    @Param('customerId') customerId: string,
    @Body()
    {
      shoppingCart,
    }: {
      shoppingCart: { price_id: string; quantity: number }[];
    },
  ): Promise<any> {
    const createCheckoutDto: CreateCheckoutDto = {
      customer_id: customerId,
      shoppingCart: shoppingCart,
    };
    const sessionId =
      await this.paymentService.createCheckoutSession(createCheckoutDto);
    return { sessionId };
  }
}
