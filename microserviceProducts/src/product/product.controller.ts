import { Body, Controller, Post, Get, Param, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductMsg } from 'src/common/constants';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
//aqui ya no se usa el servicio de pasajeros, si no que se manda a llamar al microservicio
@Controller()
export class PoductController {
    constructor(
        private readonly productService: ProductService,
    ) { }

    @MessagePattern(ProductMsg.CREATE)
    @UsePipes(new ValidationPipe())
    async createProduct(@Payload() productDto: CreateProductDto) {
        return this.productService.create(productDto);
    }

    @MessagePattern(ProductMsg.FIND_ALL)
    async findAllProducts() {
        return this.productService.findAll();
    }
}   
