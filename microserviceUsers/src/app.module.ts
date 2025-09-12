import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Necesitarás esto para las variables de entorno
import { SequelizeModule } from '@nestjs/sequelize'; // Importa SequelizeModule
import { UserModule } from './user/user.module'; // Importa tu UserModule
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Importa ConfigModule para cargar variables de entorno
    ConfigModule.forRoot({
      isGlobal: true, // Haz que las variables de entorno sean accesibles globalmente
      envFilePath: '.env', // Asegúrate de que apunte a tu archivo .env
    }),
    // Configura la conexión a la base de datos de Sequelize
    SequelizeModule.forRootAsync({
      imports: [ConfigModule], // Importa ConfigModule para usar ConfigService
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres', // Usando PostgreSQL
        host: configService.get<string>('DB_USERS_HOST') || 'postgres_users', // Nombre del servicio Docker
        port: configService.get<number>('DB_USERS_PORT') || 5432,
        username: configService.get<string>('DB_USERS_USERNAME') || 'user_users',
        password: configService.get<string>('DB_USERS_PASSWORD') || 'password_users',
        database: configService.get<string>('DB_USERS_DATABASE') || 'users_db',
        autoLoadModels: true, // Carga automáticamente los modelos
        synchronize: true,    // Sincroniza los modelos con la base de datos (¡usar con precaución en producción!)

      }),
      inject: [ConfigService],
    }),
    UserModule, // Importa tu módulo de usuarios aquí
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
