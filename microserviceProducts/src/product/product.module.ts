import { Module } from '@nestjs/common';
import { PoductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FLIGHT, PASSENGER } from 'src/common/models/models';
import { ProductImage } from './models/productImages.model';
import { Review } from './models/review.model';
import { Dimensions } from './models/dimentions.model';
import { Meta } from './models/meta.model';
import { Category } from './models/category.model';
import { Product } from './models/product.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    // Importa los modelos de Sequelize para este módulo
    SequelizeModule.forFeature([Product, Category, Meta, Dimensions, Review, ProductImage]), // <-- ¡CORRECCIÓN AQUÍ!
  ],
  controllers: [PoductController],
  providers: [ProductService],
  // Si necesitas exportar AuthService para que otros módulos (como App.module si lo inyecta)
  // puedan usarlo, podrías añadirlo aquí. Pero generalmente no es necesario en microservicios.
  // exports: [AuthService, JwtModule],
})
export class ProductModule {}
