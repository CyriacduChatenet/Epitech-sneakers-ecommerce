import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { PdfService } from './pdf.service';

@Module({
  imports: [HttpModule],
  providers: [PdfService],
  exports: [PdfService],
})
export class PdfModule {}
