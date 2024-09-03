import { Body, Controller, Param, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginUserInputDTO } from '../user/dto/login-user.dto';
import { SignupUserInputDTO } from '../user/dto/signup-user.dto';
import { ForgotPasswordDTO } from './dto/forgotPassword.dto';
import { ResetPasswordDTO } from './dto/resetPassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  public async signin(@Body() signinUserInputDTO: LoginUserInputDTO) {
    return this.authService.signin(signinUserInputDTO);
  }

  @Post('signup')
  public signup(@Body() signupUserInputDTO: SignupUserInputDTO) {
    return this.authService.signup(signupUserInputDTO);
  }

  @Post('forgot-password')
  public forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDTO) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password/:token')
  public resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDTO,
  ) {
    return this.authService.resetPassword(token, resetPasswordDto);
  }
}
