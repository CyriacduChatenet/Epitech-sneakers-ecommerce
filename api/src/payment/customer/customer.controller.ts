import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiQuery } from '../../types/api.type';
import { Roles } from '../../decorators/role.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Role } from '../../enums/role.enum';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll(@Query() queries: ApiQuery) {
    return this.customerService.findAll(queries);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOneById(id);
  }

  @Get('/stripe/:stripeId')
  findOneByStripeId(@Param('stripeId') stripeId: string) {
    return this.customerService.findOneByStripeId(stripeId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.User, Role.Admin)
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.User, Role.Admin)
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
