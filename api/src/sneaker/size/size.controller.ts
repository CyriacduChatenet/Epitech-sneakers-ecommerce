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

import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { ApiQuery } from '../../types/api.type';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Role } from '../../enums/role.enum';
import { Roles } from '../../decorators/role.decorator';

@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  create(@Body() createSizeDto: CreateSizeDto) {
    return this.sizeService.create(createSizeDto);
  }

  @Get()
  findAll(@Query() queries: ApiQuery) {
    return this.sizeService.findAll(queries);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sizeService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateSizeDto: UpdateSizeDto) {
    return this.sizeService.update(id, updateSizeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.sizeService.remove(id);
  }
}
