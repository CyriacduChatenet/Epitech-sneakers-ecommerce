import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { SizeRepository } from './size.repository';
import { ApiQuery } from '../../types/api.type';

@Injectable()
export class SizeService {
  constructor(private readonly sizeRepository: SizeRepository) {}

  async create(createSizeDto: CreateSizeDto) {
    try {
      return await this.sizeRepository.createSize(createSizeDto);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  async createMany(sizes: string[]) {
    try {
      sizes.forEach(async (size) => {
        return await this.sizeRepository.createSize({
          size: size,
          sneakers: [],
        });
      });
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  async findAll(queries: ApiQuery) {
    try {
      return this.sizeRepository.findAllSizes(queries);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async findOne(id: string) {
    try {
      return await this.sizeRepository.findOneSizeById(id);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async update(id: string, updateSizeDto: UpdateSizeDto) {
    try {
      return await this.sizeRepository.updateSize(id, updateSizeDto);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  async remove(id: string) {
    try {
      return await this.sizeRepository.removeSize(id);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
