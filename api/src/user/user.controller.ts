import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Query,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiQuery } from '../types/api.type';
import { SignupUserInputDTO } from './dto/signup-user.dto';
import { Role } from '../enums/role.enum';
import { Roles } from '../decorators/role.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() signupUserDto: SignupUserInputDTO): Promise<User> {
    return await this.userService.create(
      signupUserDto,
      signupUserDto.roles as Role,
    );
  }

  @Get()
  async findAll(@Query() queries: ApiQuery) {
    return await this.userService.findAll(queries);
  }

  @Get(':email')
  async findOneByEmail(@Param('email') email: string): Promise<User> {
    return await this.userService.findOneByEmail(email);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.User, Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() signupUserDto: SignupUserInputDTO,
  ) {
    return await this.userService.update(id, signupUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.User, Role.Admin)
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.userService.remove(id);
  }
}
