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

import { SneakerService } from './sneaker.service';
import { CreateSneakerDto } from './dto/create-sneaker.dto';
import { UpdateSneakerDto } from './dto/update-sneaker.dto';
import { ApiQuery } from '../types/api.type';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';

@Controller('sneaker')
export class SneakerController {
  constructor(private readonly sneakerService: SneakerService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  create(@Body() createSneakerDto: CreateSneakerDto) {
    return this.sneakerService.create(createSneakerDto);
  }

  @Get()
  findAll(@Query() queries: ApiQuery) {
    return this.sneakerService.findAll(queries);
  }

  @Get('list-by-name')
  findAllByName(@Query() queries: ApiQuery) {
    return this.sneakerService.findAllByName(queries);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.sneakerService.findOneById(id);
  }

  @Get('/name/:name')
  findOne(@Param('name') name: string) {
    return this.sneakerService.findOneByName(name);
  }

  @Get('/stock/:stock')
  findOneByStockId(@Param('stock') stock: string) {
    return this.sneakerService.findOneByStockId(stock);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateSneakerDto: UpdateSneakerDto) {
    return this.sneakerService.update(id, updateSneakerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.sneakerService.remove(id);
  }
}
