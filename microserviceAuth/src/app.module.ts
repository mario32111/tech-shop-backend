import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importa ConfigService
import { SequelizeModule } from '@nestjs/sequelize'; // Importa SequelizeModule
import { AuthModule } from './auth/auth.module';
import { AuthUser } from './auth/models/auth-user.model';
import { RefreshToken } from './auth/models/refresh-token.model';
import { PasswordResetToken } from './auth/models/password-reset-token.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'], // Asegúrate de que esta ruta sea correcta para tu .env
      isGlobal: true,
    }),

    SequelizeModule.forRootAsync({
      imports: [ConfigModule], // Importa ConfigModule para usar ConfigService
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres', // Especifica el dialecto de la base de datos
        host: configService.get<string>('DB_AUTH_HOST'), // Usar variable de entorno para el host
        port: configService.get<number>('DB_AUTH_PORT'), // Usar variable de entorno para el puerto
        username: configService.get<string>('DB_AUTH_USER'), // Usar variable de entorno para el usuario
        password: configService.get<string>('DB_AUTH_PASSWORD'), // Usar variable de entorno para la contraseña
        database: configService.get<string>('DB_AUTH_NAME'), // Usar variable de entorno para el nombre de la DB
        autoLoadModels: true, // Carga automáticamente los modelos definidos
        synchronize: true,    // Sincroniza los modelos con la base de datos (¡usar con precaución en producción!)
        models: [AuthUser, RefreshToken, PasswordResetToken], // Si tienes modelos de Sequelize, impórtalos y listalos aquí
      }),
      inject: [ConfigService], // Inyecta ConfigService en useFactory
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
