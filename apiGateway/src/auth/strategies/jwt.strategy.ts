// En el API Gateway, src/auth/strategies/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { ClientProxyTechShop } from 'src/common/proxy/client-proxy';
import { AuthMsg } from 'src/common/constants';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private clientProxyAuth: ClientProxy;

  constructor(
    private readonly configService: ConfigService,
    private readonly clientProxy: ClientProxyTechShop,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');

    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
    this.clientProxyAuth = this.clientProxy.clientProxyAuth();
  }

  async validate(payload: any) {
    try {
      // 💡 AHORA SÍ: Delegamos la validación del token al microservicio.
      // El microservicio recibirá el ID de usuario del payload del token.
      const user = await lastValueFrom(
        this.clientProxyAuth.send(AuthMsg.VALIDATE_USER_BY_ID, { userId: payload.sub })
      );
      console.log('User validation result from microservice:', user);

      // Si el microservicio no devuelve un usuario válido, lanzamos una excepción.
      if (!user) {
        throw new UnauthorizedException('User account is inactive or not found.');
      }

      // Si el microservicio confirma que el usuario es válido, retornamos el objeto.
      return user;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}