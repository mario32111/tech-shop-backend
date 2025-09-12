// microserviceAuth/src/auth/strategies/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    // Obtener el secreto JWT
    const jwtSecret = configService.get<string>('JWT_SECRET');

    // Validar que el secreto no sea undefined.
    // Es CRUCIAL que esta variable de entorno esté definida en tu archivo .env
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables. Please check your .env file.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Usamos el secreto que ya verificamos que NO es undefined.
      // El operador '!' (non-null assertion) le dice a TypeScript que estamos seguros de que no es null/undefined aquí.
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any) {
    // El 'payload' es el objeto que firmaste en AuthService.signIn
    // Puedes añadir lógica de validación adicional aquí si es necesario.
    return { userId: payload.sub, username: payload.username, email: payload.email };
  }
}
