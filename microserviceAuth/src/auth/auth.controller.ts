// microserviceAuth/src/auth/auth.controller.ts

import { Controller, UsePipes, ValidationPipe, UnauthorizedException } from '@nestjs/common';
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
  constructor(private readonly authService: AuthService) { }



  @MessagePattern(AuthMsg.VALIDATE_USER_BY_ID)
  async validateUserById(@Payload('userId') userId: number): Promise<{ id: number; email: string; username: string; isActive: boolean } | null> {
    console.log('Microservice received validation request for user ID:', userId);
    const user = await this.authService.validateUserById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found or is inactive.');
    }
    return user;
  }

  @MessagePattern(AuthMsg.LOGIN)
  @UsePipes(new ValidationPipe())
  async login(@Payload() loginUserDto: LoginUserDto) {
    console.log('Login attempt:', loginUserDto.email);
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
  async validateToken(@Payload('token') token: string) {
    // Llama al servicio de autenticación
    const validationResult = await this.authService.validateAuthToken(token);
    console.log('Token validation result:', validationResult);
    if (!validationResult.isValid) {
      // Si la validación secundaria falla, lanza una excepción
      // Esto se convertirá en un error HTTP si el API Gateway lo maneja
      throw new UnauthorizedException(validationResult.reason);
    }

    // Si la validación secundaria es exitosa, devuelve el payload
    return validationResult.payload;
  }

  @MessagePattern(AuthMsg.REFRESH_TOKEN)
  @UsePipes(new ValidationPipe()) // Aplica el ValidationPipe
  async refreshToken(@Payload() refreshTokenDto: RefreshTokenDto) { // Usa el DTO
    return this.authService.refreshToken(refreshTokenDto.refreshToken); // Accede al campo 'refreshToken'
  }

  @MessagePattern(AuthMsg.LOGOUT)
  @UsePipes(new ValidationPipe()) // Aplica el ValidationPipe
  async logout(@Payload() logoutDto: LogoutDto) { // Usa el DTO
    console.log('Logging out user:', logoutDto);
    return this.authService.logout(logoutDto.accessToken); // Accede al campo 'accessToken'
  }
}
