import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { Role } from '../enums/role.enum';
import { SignupUserInputDTO } from '../user/dto/signup-user.dto';
import { LoginUserInputDTO } from '../user/dto/login-user.dto';
import { MailService } from '../mail/mail.service';
import { ResetPasswordTokenService } from './reset-password-token/reset-password-token.service';
import { ForgotPasswordDTO } from './dto/forgotPassword.dto';
import { ResetPasswordDTO } from './dto/resetPassword.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
    private resetPasswordTokenService: ResetPasswordTokenService,
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

      await this.mailService.sendSignupMail(signupUserInputDTO.email);

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

  public async forgotPassword(forgotPasswordDto: ForgotPasswordDTO) {
    try {
      const user = await this.userService.findOneByEmail(
        forgotPasswordDto.email,
      );
      const resetToken = await this.resetPasswordTokenService.create(user.id);
      const userUpdated = await this.userService.update(user.id, {
        resetPasswordToken: resetToken.id,
      });
      await this.mailService.sendForgotPasswordMail(
        forgotPasswordDto.email,
        `${process.env.CLIENT_APP_URL}/reset-password/${resetToken.token}`,
      );
      return userUpdated;
    } catch (err) {
      throw new HttpException(
        'User with this email does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async resetPassword(
    resetToken: string,
    resetPasswordDto: ResetPasswordDTO,
  ) {
    console.log(resetToken);
    console.log(resetPasswordDto);
    try {
      const token =
        await this.resetPasswordTokenService.findOneByToken(resetToken);

      const user = await this.userService.findOneByEmail(token.user.email);
      const userUpdated = await this.userService.update(user.id, {
        ...user,
        password: await bcrypt.hash(resetPasswordDto.password, 10),
      });
      await this.mailService.sendConfirmResetPasswordMail(user.email);
      return userUpdated;
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }
  }
}
