import { DataSource, DeleteResult, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

import { Sneaker } from './entities/sneaker.entity';
import { CreateSneakerDto } from './dto/create-sneaker.dto';
import { UpdateSneakerDto } from './dto/update-sneaker.dto';
import { ApiQuery } from '../types/api.type';

export class SneakerRepository extends Repository<Sneaker> {
  constructor(@InjectDataSource() datasource: DataSource) {
    super(Sneaker, datasource.createEntityManager());
  }

  async createSneaker(createSneakerDto: CreateSneakerDto): Promise<Sneaker> {
    const sneaker = this.create({ ...createSneakerDto } as Sneaker);
    return await this.save(sneaker);
  }

  async findAllSneakers(queries: ApiQuery) {
    let { page, limit, sortedBy, gender } = queries;
    page = page ? +page : 1;
    limit = limit ? +limit : 10;

    const query = this.createQueryBuilder('sneaker');

    if (sortedBy) {
      query.orderBy('sneaker.createdAt', sortedBy);
    } else {
      query.orderBy('sneaker.createdAt', 'DESC');
    }

    if (gender) {
      query.where('sneaker.gender = :gender', { gender });
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

  async findOneSneakerById(id: string): Promise<Sneaker> {
    return await this.createQueryBuilder('sneaker')
      .where('sneaker.id = :id', { id })
      .getOne();
  }

  async updateSneaker(
    id: string,
    updateSneakerDto: UpdateSneakerDto | unknown,
  ) {
    return await this.update(id, updateSneakerDto);
  }

  async removeSneaker(id: string): Promise<DeleteResult> {
    return await this.softDelete(id);
  }
}
