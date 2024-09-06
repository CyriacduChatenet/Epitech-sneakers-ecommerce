import { Module } from '@nestjs/common';

import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { SizeRepository } from './size.repository';

@Module({
  controllers: [SizeController],
  providers: [SizeService, SizeRepository],
  exports: [SizeService],
})
export class SizeModule {}
