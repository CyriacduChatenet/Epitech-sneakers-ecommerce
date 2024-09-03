import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerRepository } from './customer.repository';
import { ApiQuery } from '../../types/api.type';
import { StripeCustomerService } from '../stripe/stripe-customer/stripe-customer.service';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly stripeCustomerService: StripeCustomerService,
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const stripeCustomer =
        await this.stripeCustomerService.createStripeCustomer({
          email: createCustomerDto.email,
          name: createCustomerDto.name,
        });
      return await this.customerRepository.createCustomer(
        createCustomerDto,
        stripeCustomer,
      );
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  async findAll(queries: ApiQuery) {
    try {
      return await this.customerRepository.findAllCustomer(queries);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async findOneById(id: string) {
    try {
      return await this.customerRepository.findOneCustomerById(id);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async findOneByStripeId(stripeId: string) {
    try {
      return await this.customerRepository.findOneCustomerByStripeId(stripeId);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      return await this.customerRepository.updateCustomer(
        id,
        updateCustomerDto,
      );
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  async remove(id: string) {
    try {
      return await this.customerRepository.removeCustomer(id);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
