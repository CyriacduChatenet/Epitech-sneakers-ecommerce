import { DataSource, DeleteResult, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

import { Stock } from './entities/stock.entity';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ApiQuery } from '../types/api.type';

export class StockRepository extends Repository<Stock> {
  constructor(@InjectDataSource() datasource: DataSource) {
    super(Stock, datasource.createEntityManager());
  }

  async createStock(createStockDto: CreateStockDto): Promise<Stock> {
    const Stock = this.create(createStockDto);
    return await this.save(Stock);
  }

  async findAllStocks(queries: ApiQuery) {
    let { page, limit, sortedBy } = queries;
    page = page ? +page : 1;
    limit = limit ? +limit : 10;

    const query = this.createQueryBuilder('stock')
      .leftJoinAndSelect('stock.sneaker', 'sneaker')
      .leftJoinAndSelect('stock.size', 'size');

    if (sortedBy) {
      query.orderBy('stock.createdAt', sortedBy);
    } else {
      query.orderBy('stock.createdAt', 'DESC');
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

  async findOneStockById(id: string): Promise<Stock> {
    return await this.createQueryBuilder('stock')
      .leftJoinAndSelect('stock.sneaker', 'sneaker')
      .leftJoinAndSelect('stock.size', 'size')
      .where('stock.id = :id', { id })
      .getOne();
  }

  async updateStock(id: string, updateStockDto: UpdateStockDto | unknown) {
    return await this.update(id, updateStockDto);
  }

  async removeStock(id: string): Promise<DeleteResult> {
    return await this.softDelete(id);
  }
}
