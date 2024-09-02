import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SneakerService } from './sneaker.service';
import { SneakerController } from './sneaker.controller';
import { SneakerRepository } from './sneaker.repository';
import { Sneaker } from './entities/sneaker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sneaker])],
  controllers: [SneakerController],
  providers: [SneakerService, SneakerRepository],
})
export class SneakerModule {}
