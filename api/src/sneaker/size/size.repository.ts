import { Brackets, DataSource, DeleteResult, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

import { Size } from './entities/size.entity';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { ApiQuery } from '../../types/api.type';

export class SizeRepository extends Repository<Size> {
  constructor(@InjectDataSource() datasource: DataSource) {
    super(Size, datasource.createEntityManager());
  }

  async createSize(createSizeDto: CreateSizeDto): Promise<Size> {
    const Size = this.create(createSizeDto);
    return await this.save(Size);
  }

  async findAllSizes(queries: ApiQuery) {
    let { page, limit, sortedBy, search } = queries;
    page = page ? +page : 1;
    limit = limit ? +limit : 10;

    const query = this.createQueryBuilder('size')
      .leftJoinAndSelect('size.stocks', 'stock')
      .orderBy('size.size', 'ASC');

    if (sortedBy) {
      query.orderBy('size.createdAt', sortedBy);
    } else {
      query.orderBy('size.createdAt', 'DESC');
    }

    if (search) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('size.size LIKE :search', {
            search: `%${search}%`,
          });
        }),
      );
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

  async findOneSizeById(id: string): Promise<Size> {
    return await this.createQueryBuilder('size')
      .leftJoinAndSelect('size.stocks', 'stock')
      .where('size.id = :id', { id })
      .getOne();
  }

  async updateSize(id: string, updateSizeDto: UpdateSizeDto | unknown) {
    return await this.update(id, updateSizeDto);
  }

  async removeSize(id: string): Promise<DeleteResult> {
    return await this.softDelete(id);
  }
}
