import { Injectable, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { ProductImage } from './models/productImages.model';
import { Review } from './models/review.model';
import { Dimensions } from './models/dimentions.model';
import { Meta } from './models/meta.model';
import { Category } from './models/category.model';
import { Product } from './models/product.model';
import { CreateProductDto } from './dto/create-product.dto';

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

    async create(productDto: CreateProductDto): Promise<Product> {
        try {
            // Sequelize's create method handles DTO directly if properties match
            const product = await this.productsModel.create(productDto as any);
            return product;
        } catch (error) {
            console.error('Error creando un nuevo producto en el Microservicio de Productos:', error);
            throw new RpcException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Fallo al crear un nuevo producto',
            });
        }
    }

    async findAll(): Promise<Product[]> {
        return this.productsModel.findAll({
            include: [
                { model: Review },
                { model: ProductImage },
                { model: Dimensions },
                { model: Meta },
                { model: Category },
            ],
        });
    }
    
}
