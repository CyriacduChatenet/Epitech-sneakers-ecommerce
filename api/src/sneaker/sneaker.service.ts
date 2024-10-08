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
import { SizeService } from './size/size.service';
import { sizeToCreate } from '../utils/size.util';
import { StockService } from '../stock/stock.service';
import { Sneaker } from './entities/sneaker.entity';

@Injectable()
export class SneakerService implements OnApplicationBootstrap {
  constructor(
    private sneakerRepository: SneakerRepository,
    private httpService: HttpService,
    private configService: ConfigService,
    private stripeProductService: StripeProductService,
    private sizeService: SizeService,
    private stockService: StockService,
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
      const data = await this.sneakerRepository.findAllSneakers(queries);
      let sneakers = [];
      const uniqueSneakers: { [key: string]: Sneaker } = {};

      data.data.map((sneaker: Sneaker) => {
        const arrName = sneaker.name.split(' ').slice(0, -3).join(' ');

        if (!uniqueSneakers[arrName]) {
          uniqueSneakers[arrName] = {
            ...sneaker,
            name: arrName,
          };
          sneakers.push(uniqueSneakers[arrName]);
        }
      });
      return { ...data, data: sneakers, total: sneakers.length };
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async findAllByName(queries: ApiQuery) {
    try {
      if (!queries.name) {
        throw new NotFoundException('Name is required');
      }

      return await this.sneakerRepository.findAllSneakersByName(queries);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async findOneById(id: string) {
    try {
      const stocks = [];
      const sneaker = await this.sneakerRepository.findOneSneakerById(id);
      const sneakersByName = await this.findAllByName({
        name: sneaker.name.split(' ').slice(0, -3).join(' '),
      });
      sneakersByName.data.map((item) => {
        stocks.push(item.stocks[0]);
      });

      return {
        ...sneaker,
        name: sneaker.name.split(' ').slice(0, -3).join(' '),
        stocks,
      };
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async findOneByName(name: string) {
    try {
      return await this.sneakerRepository.findOneSneakerByName(name);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async findOneByStockId(stockId: string) {
    try {
      return await this.sneakerRepository.findOneSneakerByStockId(stockId);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  private async findAllFromExternalApi() {
    const response = await firstValueFrom(
      this.httpService.get(
        `${this.configService.get<string>('EXTERNAL_API_URL')}/api/sneakers?pagination%5Bpage%5D=2&pagination%5BpageSize%5D=100`,
      ),
    );

    return response;
  }

  private async checkIfExternalDataAreInDatabase() {
    try {
      const dataInDatabase = await this.findAll({ page: 1, limit: 100 });
      const totalItemInTable = dataInDatabase.total;

      if (totalItemInTable === 0) {
        // Créez les tailles si elles n'existent pas déjà
        await this.sizeService.createMany(sizeToCreate);
        const sizeResponse = await this.sizeService.findAll({
          page: 1,
          limit: 100,
        });

        // Récupérez les tailles
        const sizes = sizeResponse.data;

        // Obtenez les données des sneakers depuis l'API externe
        const sneakerExternalResponse = await this.findAllFromExternalApi();
        const sneakersData = sneakerExternalResponse.data.data;

        for (const size of sizes) {
          for (const item of sneakersData) {
            // Créez le produit Stripe
            const stripeProduct =
              await this.stripeProductService.createStripeProduct({
                name: `${item.attributes.name} - ${size.size}`,
                description: 'Sneaker',
                images: [],
                price: item.attributes.retailPrice * 100,
              });

            const stripe_price_id = await this.stripeProductService.findOne(
              stripeProduct.id,
            );

            // Créez un nouveau sneaker
            const newSneaker = await this.create({
              external_id: item.id,
              ...item.attributes,
              name: `${item.attributes.name} - ${size.size}`,
              stripe_product_id: stripeProduct.id,
              stripe_price_id: stripe_price_id.default_price,
              stocks: [], // Initialisez avec un tableau vide pour ajouter des stocks après
            });

            // Sauvegardez le sneaker
            const savedSneaker = await this.sneakerRepository.save(newSneaker);

            // Créez et associez des stocks pour ce sneaker avec la taille actuelle
            await this.stockService.create({
              quantity: 1000,
              size: size,
              sneaker: savedSneaker, // Associez le stock au sneaker nouvellement créé
            });
          }
        }
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
