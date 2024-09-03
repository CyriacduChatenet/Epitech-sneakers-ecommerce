import { DataSource, DeleteResult, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

import { Customer } from './entities/customer.entity';
import { ApiQuery } from '../../types/api.type';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import Stripe from 'stripe';

export class CustomerRepository extends Repository<Customer> {
  constructor(@InjectDataSource() datasource: DataSource) {
    super(Customer, datasource.createEntityManager());
  }

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
    stripeCustomer: Stripe.Response<Stripe.Customer>,
  ): Promise<Customer> {
    const customer = this.create({
      ...createCustomerDto,
      stripeId: stripeCustomer.id,
    } as Customer);
    return await this.save(customer);
  }

  async saveCustomer(customer: Customer) {
    return await this.save(customer);
  }

  async findAllCustomer(queries: ApiQuery) {
    let { page, limit, sortedBy } = queries;
    page = page ? +page : 1;
    limit = limit ? +limit : 10;

    const query = this.createQueryBuilder('customer');

    if (sortedBy) {
      query.orderBy('customer.createdAt', sortedBy);
    } else {
      query.orderBy('customer.createdAt', 'DESC');
    }

    return {
      page: page,
      limit: limit,
      total: await query.getCount(),
      data: await query
        .skip((page - 1) * limit)
        .take(limit)
        .getMany(),
    };
  }

  async findOneCustomerById(id: string): Promise<Customer> {
    return await this.createQueryBuilder('customer')
      .where('customer.id = :id', { id })
      .getOne();
  }

  async findOneCustomerByStripeId(stripeId: string): Promise<Customer> {
    return await this.createQueryBuilder('customer')
      .where('customer.stripeId = :stripeId', {
        stripeId,
      })
      .getOne();
  }

  async updateCustomer(
    id: string,
    signupcustomerDto: UpdateCustomerDto | unknown,
  ) {
    return await this.update(id, signupcustomerDto);
  }

  async removeCustomer(id: string): Promise<DeleteResult> {
    return await this.softDelete(id);
  }
}
