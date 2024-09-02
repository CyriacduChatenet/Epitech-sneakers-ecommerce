import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { Role } from 'src/enums/role.enum';
import { SignupUserInputDTO } from 'src/user/dto/signup-user.dto';
import { LoginUserInputDTO } from 'src/user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
  }

  public async signin(user: LoginUserInputDTO) {
    try {
      const findUser = await this.userService.findOneByEmail(user.email);

      if (!findUser) {
        throw new HttpException(`User isn't exist`, HttpStatus.NOT_ACCEPTABLE);
      }

      const payload = {
        email: findUser.email,
        id: findUser.id,
        roles: findUser.roles,
      };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    } catch (err) {
      throw new UnauthorizedException({
        message: 'Unauthorized to signin',
        err,
      });
    }
  }

  public async signup(signupUserInputDTO: SignupUserInputDTO) {
    try {
      const userInDB = await this.userService.findOneByEmail(
        signupUserInputDTO.email,
      );

      if (userInDB) {
        throw new HttpException(
          'User is already exist',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }

      const password = await bcrypt.hash(signupUserInputDTO.password, 10);

      const user = await this.userService.create(
        {
          ...signupUserInputDTO,
          password,
        },
        signupUserInputDTO.roles as Role,
      );

      const payload = {
        email: signupUserInputDTO.email,
        password: signupUserInputDTO.password,
        roles: signupUserInputDTO.roles,
      };
      return {
        signinToken: this.jwtService.sign(payload),
        user,
      };
    } catch (err) {
      throw new UnauthorizedException({
        message: 'Unauthorized to signup',
        err,
      });
    }
  }
}
