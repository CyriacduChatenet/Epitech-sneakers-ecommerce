import {
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { CreateSneakerDto } from './dto/create-sneaker.dto';
import { UpdateSneakerDto } from './dto/update-sneaker.dto';
import { SneakerRepository } from './sneaker.repository';
import { ApiQuery } from 'src/types/api.type';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SneakerService {
  constructor(
    private sneakerRepository: SneakerRepository,
    private httpService: HttpService,
  ) {}

  // async onApplicationBootstrap() {
  //   console.log('Application has bootstrapped');
  //   await this.findAllFromExternalApi();
  // }

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

  // async findAllFromExternalApi() {
  //   const response = await firstValueFrom(
  //     this.httpService.get('http://54.37.12.181:1337/api/sneakers'),
  //   );

  //   console.log('data', response.data.data, 'meta', response.data.meta);

  //   response.data.data.forEach((sneaker) => {
  //     sneaker.attributes.external_id = sneaker.id;
  //     delete sneaker.id;
  //     delete sneaker.attributes.createdAt;
  //     delete sneaker.attributes.updatedAt;
  //     this.create(sneaker.attributes);
  //   });
  // }

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
