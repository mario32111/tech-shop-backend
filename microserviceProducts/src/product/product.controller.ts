import { Body, Controller, Post, Get, Param, Put, Delete, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductMsg } from 'src/common/constants';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PatchProductDto } from './dto/patch-product.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
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

    @MessagePattern(ProductMsg.FIND_ONE)
    async findOneProduct(@Payload() id: number) {
        return this.productService.findOne(id);
    }


    //aqui al ser dos parametros se usa doble payload
    @MessagePattern(ProductMsg.UPDATE)
    @UsePipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        skipMissingProperties: false,
    }))
    async updateProduct(
        @Payload('id') id: number,
        @Payload('productDto') productDto: UpdateProductDto,
    ) {

        return this.productService.update(id, productDto);
    }

    @MessagePattern(ProductMsg.PARTIAL_UPDATE)
    @UsePipes(new ValidationPipe())
    async partialUpdateProduct(@Payload() data: { id: number, productDto: Partial<PatchProductDto> }) {
        const { id, productDto } = data;
        return this.productService.partialUpdate(id, productDto);
    }
}   
