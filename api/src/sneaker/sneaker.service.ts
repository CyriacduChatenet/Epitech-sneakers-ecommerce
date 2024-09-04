import {
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { CreateSneakerDto } from './dto/create-sneaker.dto';
import { UpdateSneakerDto } from './dto/update-sneaker.dto';
import { SneakerRepository } from './sneaker.repository';
import { ApiQuery } from '../types/api.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SneakerService implements OnApplicationBootstrap {
  constructor(
    private sneakerRepository: SneakerRepository,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    console.log('Application has bootstrapped');
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
        console.log(response.data.data);
        const data = response.data.data;

        data.forEach(async (item: any) => {
          console.log(item);
          await this.create({
            external_id: item.id,
            ...item.attributes,
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
