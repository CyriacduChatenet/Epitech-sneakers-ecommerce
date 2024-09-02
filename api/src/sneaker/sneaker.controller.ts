import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SneakerService } from './sneaker.service';
import { CreateSneakerDto } from './dto/create-sneaker.dto';
import { UpdateSneakerDto } from './dto/update-sneaker.dto';
import { ApiQuery } from 'src/types/api.type';

@Controller('sneaker')
export class SneakerController {
  constructor(private readonly sneakerService: SneakerService) {}

  @Post()
  create(@Body() createSneakerDto: CreateSneakerDto) {
    return this.sneakerService.create(createSneakerDto);
  }

  @Get()
  findAll(queries: ApiQuery) {
    return this.sneakerService.findAll(queries);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sneakerService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSneakerDto: UpdateSneakerDto) {
    return this.sneakerService.update(id, updateSneakerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sneakerService.remove(id);
  }
}
