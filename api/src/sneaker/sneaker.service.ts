import {
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

import { CreateSneakerDto } from './dto/create-sneaker.dto';
import { UpdateSneakerDto } from './dto/update-sneaker.dto';
import { SneakerRepository } from './sneaker.repository';
import { ApiQuery } from '../types/api.type';
import { StripeProductService } from '../payment/stripe/stripe-product/stripe-product.service';

@Injectable()
export class SneakerService implements OnApplicationBootstrap {
  constructor(
    private sneakerRepository: SneakerRepository,
    private httpService: HttpService,
    private configService: ConfigService,
    private stripeProductService: StripeProductService,
  ) {}

  async onApplicationBootstrap() {
    await this.checkIfExternalDataAreInDatabase();
  }

  async create(createSneakerDto: CreateSneakerDto) {
    try {
      return await this.sneakerRepository.createSneaker(createSneakerDto);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
  async findAll(queries: ApiQuery) {
    try {
      return await this.sneakerRepository.findAllSneakers(queries);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async findOneById(id: string) {
    try {
      return await this.sneakerRepository.findOneSneakerById(id);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  private async findAllFromExternalApi() {
    const response = await firstValueFrom(
      this.httpService.get(
        `${this.configService.get<string>('EXTERNAL_API_URL')}/api/sneakers`,
      ),
    );

    return response;
  }

  private async checkIfExternalDataAreInDatabase() {
    try {
      const dataInDatabase = await this.findAll({ page: 1, limit: 10 });
      const totalItemInTable = dataInDatabase.total;

      if (totalItemInTable === 0) {
        const response = await this.findAllFromExternalApi();
        const data = response.data.data;

        data.forEach(async (item: any) => {
          const stripeProduct =
            await this.stripeProductService.createStripeProduct({
              name: item.attributes.name,
              description: 'Sneaker',
              images: [],
              price: item.attributes.retailPrice * 100,
            });

          const stripe_price_id = await this.stripeProductService.findOne(
            stripeProduct.id,
          );

          await this.create({
            external_id: item.id,
            ...item.attributes,
            stripe_product_id: stripeProduct.id,
            stripe_price_id: stripe_price_id.default_price,
          });
        });
      }
    } catch (err) {
      throw new NotFoundException(
        `Data of external sneaker's API are not found`,
      );
    }
  }

  async update(id: string, updateSneakerDto: UpdateSneakerDto) {
    try {
      return await this.sneakerRepository.updateSneaker(id, updateSneakerDto);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  async remove(id: string) {
    try {
      return await this.sneakerRepository.removeSneaker(id);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
