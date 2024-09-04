import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { SneakerService } from './sneaker.service';
import { SneakerController } from './sneaker.controller';
import { SneakerRepository } from './sneaker.repository';
import { Sneaker } from './entities/sneaker.entity';
import { StripeModule } from '../payment/stripe/stripe.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sneaker]), HttpModule, StripeModule],
  controllers: [SneakerController],
  providers: [SneakerService, SneakerRepository],
})
export class SneakerModule {}
