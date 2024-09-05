import {
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
  UnauthorizedException,
} from '@nestjs/common';

import { UpdateSizeDto } from './dto/update-size.dto';
import { SizeRepository } from './size.repository';
import { ApiQuery } from '../../types/api.type';

@Injectable()
export class SizeService implements OnApplicationBootstrap {
  constructor(private readonly sizeRepository: SizeRepository) {}

  async onApplicationBootstrap() {
    await this.checkIfSizesAreInDatabase();
  }

  async create(createSizeDto: string) {
    try {
      return await this.sizeRepository.createSize(createSizeDto);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  private async createManySizes(createSizeDto: string[]) {
    try {
      createSizeDto.forEach(async (size) => {
        const data = await this.sizeRepository.createSize(size);
        return data;
      });
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  private async checkIfSizesAreInDatabase() {
    try {
      const dataInDatabase = await this.findAll({ page: 1, limit: 10 });
      const totalItemInTable = dataInDatabase.total;

      if (totalItemInTable === 0) {
        const sizes = [
          'EU 35',
          'EU 35.5',
          'EU 36',
          'EU 36.5',
          'EU 37',
          'EU 37.5',
          'EU 38',
          'EU 38.5',
          'EU 39',
          'EU 39.5',
          'EU 40',
          'EU 40.5',
          'EU 41',
          'EU 41.5',
          'EU 42',
          'EU 42.5',
          'EU 43',
          'EU 43.5',
          'EU 44',
          'EU 44.5',
          'EU 45',
          'EU 45.5',
          'EU 46',
          'EU 46.5',
          'EU 47',
          'EU 47.5',
          'EU 48',
        ];

        await this.createManySizes(sizes);
      }
    } catch (err) {
      throw new NotFoundException(
        `Data of external sneaker's API are not found`,
      );
    }
  }

  async findAll(queries: ApiQuery) {
    try {
      return await this.sizeRepository.findAllSize(queries);
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
