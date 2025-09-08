import { Injectable, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { FindOptions } from 'sequelize'; // Importa FindOptions para la tipificación correcta
import { ProductImage } from './models/productImages.model';
import { Review } from './models/review.model';
import { Dimensions } from './models/dimentions.model';
import { Meta } from './models/meta.model';
import { Category } from './models/category.model';
import { Product } from './models/product.model';

@Injectable()
export class ProductService {

    constructor(
        @InjectModel(Product)
        private productsModel: typeof Product,

        @InjectModel(Review)
        private reviewsModel: typeof Review,

        @InjectModel(ProductImage)
        private productImagesModel: typeof ProductImage,

        @InjectModel(Dimensions)
        private dimensionsModel: typeof Dimensions,

        @InjectModel(Meta)
        private metaModel: typeof Meta,

        @InjectModel(Category)
        private categoryModel: typeof Category,

    ) { }

}
