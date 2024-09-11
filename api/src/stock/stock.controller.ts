import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ApiQuery } from '../types/api.type';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @Get()
  findAll(@Query() queries: ApiQuery) {
    return this.stockService.findAll(queries);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(id, updateStockDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.stockService.remove(id);
  }
}
