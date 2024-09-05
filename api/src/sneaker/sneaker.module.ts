import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { SneakerService } from './sneaker.service';
import { SneakerController } from './sneaker.controller';
import { SneakerRepository } from './sneaker.repository';
import { Sneaker } from './entities/sneaker.entity';
import { StripeModule } from '../payment/stripe/stripe.module';
import { SizeModule } from './size/size.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sneaker]),
    HttpModule,
    StripeModule,
    SizeModule,
  ],
  controllers: [SneakerController],
  providers: [SneakerService, SneakerRepository],
})
export class SneakerModule {}
