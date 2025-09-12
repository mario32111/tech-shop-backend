import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Necesitarás esto para las variables de entorno
import { SequelizeModule } from '@nestjs/sequelize'; // Importa SequelizeModule

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
        host: configService.get<string>('DB_PRODUCTS_HOST') || 'postgres_products', // Nombre del servicio Docker
        port: configService.get<number>('DB_PRODUCTS_PORT') || 5432,
        username: configService.get<string>('DB_PRODUCTS_USERNAME') || 'user_products',
        password: configService.get<string>('DB_PRODUCTS_PASSWORD') || 'password_products',
        database: configService.get<string>('DB_PRODUCTS_DATABASE') || 'products_db',
        autoLoadModels: true, // Carga automáticamente los modelos
        synchronize: true,    // Sincroniza los modelos con la base de datos (¡usar con precaución en producción!)

      }),
      inject: [ConfigService],
    }),
    ProductModule, // Importa tu módulo de productos aquí
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
