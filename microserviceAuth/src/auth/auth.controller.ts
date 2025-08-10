// microserviceAuth/src/auth/auth.controller.ts

import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterAuthUserDto } from './dto/register-auth-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto'; // Importa el DTO
import { ValidateTokenDto } from './dto/validate-token.dto'; // Importa el DTO
import { LogoutDto } from './dto/logout.dto'; // Importa el DTO
import { AuthMsg } from 'src/common/constants';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AuthMsg.LOGIN)
  @UsePipes(new ValidationPipe())
  async login(@Payload() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password);
    if (user) {
      return this.authService.signIn(user);
    }
    return { status: 'error', message: 'Invalid credentials' };
  }

  @MessagePattern(AuthMsg.REGISTER)
  @UsePipes(new ValidationPipe())
  async register(@Payload() registerAuthUserDto: RegisterAuthUserDto) {
    return this.authService.signUp(registerAuthUserDto);
  }

  @MessagePattern(AuthMsg.VALIDATE_TOKEN)
  @UsePipes(new ValidationPipe()) // Aplica el ValidationPipe
  async validateToken(@Payload() validateTokenDto: ValidateTokenDto) { // Usa el DTO
    return this.authService.validateAuthToken(validateTokenDto.token); // Accede al campo 'token'
  }

  @MessagePattern(AuthMsg.REFRESH_TOKEN)
  @UsePipes(new ValidationPipe()) // Aplica el ValidationPipe
  async refreshToken(@Payload() refreshTokenDto: RefreshTokenDto) { // Usa el DTO
    return this.authService.refreshToken(refreshTokenDto.refreshToken); // Accede al campo 'refreshToken'
  }

  @MessagePattern(AuthMsg.LOGOUT)
  @UsePipes(new ValidationPipe()) // Aplica el ValidationPipe
  async logout(@Payload() logoutDto: LogoutDto) { // Usa el DTO
    return this.authService.logout(logoutDto.accessToken); // Accede al campo 'accessToken'
  }
}
