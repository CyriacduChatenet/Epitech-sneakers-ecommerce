import { Module } from '@nestjs/common';

import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Size } from './entities/size.entity';
import { SizeRepository } from './size.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Size])],
  controllers: [SizeController],
  providers: [SizeService, SizeRepository],
  exports: [SizeService],
})
export class SizeModule {}
