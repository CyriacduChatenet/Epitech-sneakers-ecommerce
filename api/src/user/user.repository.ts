import { Brackets, DataSource, DeleteResult, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { ApiQuery } from '../types/api.type';
import { SignupUserInputDTO } from './dto/signup-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

export class UserRepository extends Repository<User> {
  constructor(@InjectDataSource() datasource: DataSource) {
    super(User, datasource.createEntityManager());
  }

  async createUser(signupUserDto: SignupUserInputDTO): Promise<User> {
    const user = this.create({ ...signupUserDto } as User);
    return await this.save(user);
  }

  async saveUser(user: User) {
    return await this.save(user);
  }

  async findAllUser(queries: ApiQuery) {
    let { page, limit, sortedBy, username, email, roles, search } = queries;
    page = page ? +page : 1;
    limit = limit ? +limit : 10;

    const query = this.createQueryBuilder('user').leftJoinAndSelect(
      'user.customer',
      'customer',
    );

    if (sortedBy) {
      query.orderBy('user.createdAt', sortedBy);
    } else {
      query.orderBy('user.createdAt', 'DESC');
    }

    if (username) {
      query.andWhere('user.username LIKE :username', { username });
    }

    if (email) {
      query.andWhere('user.email LIKE :email', { email });
    }

    if (roles) {
      query.andWhere('user.roles = :roles', { roles });
    }

    if (search) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('user.username LIKE :search', {
            search: `%${search}%`,
          }).orWhere('user.email LIKE :search', { search: `%${search}%` });
        }),
      );
    }

    return {
      page: page,
      limit: limit,
      total: await query.getCount(),
      data: await query
        .skip((page - 1) * limit)
        .take(limit)
        .getMany(),
    };
  }

  async findOneUserByEmail(email: string): Promise<User> {
    return await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.customer', 'customer')
      .where('user.email = :email', { email })
      .getOne();
  }

  async findOneUserById(id: string): Promise<User> {
    return await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.customer', 'customer')
      .where('user.id = :id', { id })
      .getOne();
  }

  async updateUser(id: string, signupUserDto: UpdateUserDTO | unknown) {
    return await this.update(id, signupUserDto);
  }

  async removeUser(id: string): Promise<DeleteResult> {
    return await this.softDelete(id);
  }
}
