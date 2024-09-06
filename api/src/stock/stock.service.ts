import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockRepository } from './stock.repository';
import { ApiQuery } from '../types/api.type';
import { SneakerService } from 'src/sneaker/sneaker.service';
import { SizeService } from 'src/sneaker/size/size.service';

@Injectable()
export class StockService {
  constructor(
    private readonly stockRepository: StockRepository,
    @Inject(forwardRef(() => SneakerService))
    private readonly sneakerService: SneakerService,
    @Inject(forwardRef(() => SizeService))
    private readonly sizeService: SizeService,
  ) {}

  async create(createStockDto: CreateStockDto) {
    try {
      return await this.stockRepository.createStock(createStockDto);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  async findAll(queries: ApiQuery) {
    try {
      return await this.stockRepository.findAllStocks(queries);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async findOne(id: string) {
    try {
      return await this.stockRepository.findOneStockById(id);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async update(id: string, updateStockDto: UpdateStockDto) {
    try {
      let stock = await this.stockRepository.findOneStockById(id);

      if (stock) {
        stock.quantity = updateStockDto.quantity;
        await this.stockRepository.save(stock);
      } else {
        const sneaker = await this.sneakerService.findOneById(
          updateStockDto.sneaker.id,
        );
        const size = await this.sizeService.findOne(updateStockDto.size.id);
        stock = this.stockRepository.create({
          sneaker,
          size,
          quantity: updateStockDto.quantity,
        });
        await this.stockRepository.save(stock);
      }
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  async remove(id: string) {
    try {
      return await this.stockRepository.removeStock(id);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
