// microserviceAuth/src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// ELIMINAR: import { UserModule } from 'src/user/user.module'; // ¡Esto crea acoplamiento!
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProxyModule } from 'src/common/proxy/proxy.module'; // Para comunicarse con otros microservicios
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthUser } from './models/auth-user.model'; // Importa el modelo AuthUser
import { RefreshToken } from './models/refresh-token.model'; // Importa el modelo RefreshToken
import { PasswordResetToken } from './models/password-reset-token.model'; // Importa el modelo PasswordResetToken

@Module({
  imports: [
    // Importa los modelos de Sequelize para este módulo
    SequelizeModule.forFeature([AuthUser, RefreshToken, PasswordResetToken]), // <-- ¡CORRECCIÓN AQUÍ!
    PassportModule,
    ProxyModule, // Necesario para que AuthService pueda comunicarse con microservice-users
    JwtModule.registerAsync({
      imports: [ConfigModule], // Solo ConfigModule es necesario aquí para JWT
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('EXPIRES_IN'),
          audience: configService.get<string>('APP_URL'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  // Si necesitas exportar AuthService para que otros módulos (como App.module si lo inyecta)
  // puedan usarlo, podrías añadirlo aquí. Pero generalmente no es necesario en microservicios.
  // exports: [AuthService, JwtModule],
})
export class AuthModule { }
