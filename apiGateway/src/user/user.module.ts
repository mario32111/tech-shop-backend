import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  //hay que agregar el proxy moule par aque este modulo haga la conexion con RabbitMQ
  imports: [
    ProxyModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
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
  controllers: [UserController],
  providers: [JwtStrategy],

})
export class UserModule { }
