import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateSneakerDto } from './dto/create-sneaker.dto';
import { UpdateSneakerDto } from './dto/update-sneaker.dto';
import { SneakerRepository } from './sneaker.repository';
import { ApiQuery } from 'src/types/api.type';

@Injectable()
export class SneakerService {
  constructor(private sneakerRepository: SneakerRepository) {}

  async create(createSneakerDto: CreateSneakerDto) {
    try {
      return await this.sneakerRepository.create(createSneakerDto);
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
