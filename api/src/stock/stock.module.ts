import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { Stock } from './entities/stock.entity';
import { StockRepository } from './stock.repository';
import { SizeModule } from '../sneaker/size/size.module';
import { SneakerModule } from '../sneaker/sneaker.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stock]),
    forwardRef(() => SizeModule),
    forwardRef(() => SneakerModule),
  ],
  controllers: [StockController],
  providers: [StockService, StockRepository],
  exports: [StockService],
})
export class StockModule {}
