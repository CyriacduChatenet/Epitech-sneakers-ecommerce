import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { StripeProductService } from './stripe-product.service';

@Controller('stripe-product')
export class StripeProductController {
  constructor(private readonly stripeProductService: StripeProductService) {}

  @Get('')
  async findAll() {
    try {
      return await this.stripeProductService.findAll();
    } catch (err) {
      throw new NotFoundException('No products found');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.stripeProductService.findOne(id);
    } catch (err) {
      throw new NotFoundException('No product found');
    }
  }
}
