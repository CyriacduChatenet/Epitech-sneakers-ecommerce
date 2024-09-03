import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { ApiQuery } from '../types/api.type';
import { testEmailUtil } from '../utils/regex-test-email.util';
import { SignupUserInputDTO } from './dto/signup-user.dto';
import { Role } from '../enums/role.enum';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(signupUserDto: SignupUserInputDTO, roles: Role): Promise<User> {
    try {
      if (testEmailUtil(signupUserDto.email)) {
        const user = new User();
        user.username = signupUserDto.username;
        user.email = signupUserDto.email;
        user.password = signupUserDto.password;
        user.roles = roles;

        return await this.userRepository.save(user);
      } else {
        throw new BadRequestException('email must contain ***@***.***');
      }
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Unauthorized to create user',
        error,
      });
    }
  }

  async findAll(queries: ApiQuery) {
    try {
      return await this.userRepository.findAllUser(queries);
    } catch (error) {
      throw new NotFoundException({
        message: 'List of users not found',
        error,
      });
    }
  }

  public async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneUserByEmail(email);
    } catch (error) {
      throw new NotFoundException({
        message: `User not found with email: ${email}`,
        error,
      });
    }
  }

  async update(id: string, signupUserDto: UpdateUserDTO | unknown) {
    try {
      return await this.userRepository.updateUser(id, signupUserDto);
    } catch (error) {
      throw new UnauthorizedException({
        message: `Unauthorized to update user with id: ${id}`,
        error,
      });
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      return await this.userRepository.removeUser(id);
    } catch (error) {
      throw new UnauthorizedException({
        message: `Unauthorized to delete user with id: ${id}`,
        error,
      });
    }
  }
}
