import { forwardRef, Module } from '@nestjs/common';

import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { SizeRepository } from './size.repository';
import { StockModule } from '../../stock/stock.module';

@Module({
  imports: [forwardRef(() => StockModule)],
  controllers: [SizeController],
  providers: [SizeService, SizeRepository],
  exports: [SizeService],
})
export class SizeModule {}
