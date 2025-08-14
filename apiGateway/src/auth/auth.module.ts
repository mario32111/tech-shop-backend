// microserviceAuth/src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
// ELIMINAR: import { UserModule } from 'src/user/user.module'; // ¡Esto crea acoplamiento!
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProxyModule } from 'src/common/proxy/proxy.module'; // Para comunicarse con otros microservicios

@Module({
  imports: [
    // Importa los modelos de Sequelize para este módulo
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
  providers: [ JwtStrategy],
})
export class AuthModule { }
