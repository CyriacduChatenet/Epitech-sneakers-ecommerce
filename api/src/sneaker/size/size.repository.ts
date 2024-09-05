import { DataSource, DeleteResult, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

import { Size } from './entities/Size.entity';
import { UpdateSizeDto } from './dto/update-Size.dto';
import { ApiQuery } from '../../types/api.type';

export class SizeRepository extends Repository<Size> {
  constructor(@InjectDataSource() datasource: DataSource) {
    super(Size, datasource.createEntityManager());
  }

  async createSize(createSizeDto: string): Promise<Size> {
    const Size = this.create({ size: createSizeDto } as Size);
    return await this.save(Size);
  }

  async findAllSize(queries: ApiQuery) {
    let { page, limit, sortedBy } = queries;
    page = page ? +page : 1;
    limit = limit ? +limit : 10;

    const query = this.createQueryBuilder('size').leftJoinAndSelect(
      'size.sneaker',
      'sneaker',
    );

    if (sortedBy) {
      query.orderBy('size.createdAt', sortedBy);
    } else {
      query.orderBy('size.createdAt', 'DESC');
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
      .leftJoinAndSelect('size.sneaker', 'sneaker')
      .where('size.id = :id', { id })
      .getOne();
  }

  async updateSize(id: string, updateSizeDto: UpdateSizeDto) {
    let query = await this.createQueryBuilder('size')
      .leftJoinAndSelect('size.sneaker', 'sneaker')
      .where('size.id = :id', { id })
      .getOne();

    query = { ...query, ...updateSizeDto };

    return await this.save(query);
  }

  async removeSize(id: string): Promise<DeleteResult> {
    return await this.softDelete(id);
  }
}
