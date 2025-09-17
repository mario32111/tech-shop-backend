import { Body, Controller, Post, Get, Param, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductMsg } from 'src/common/constants';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PatchProductDto } from './dto/patch-product.dto';
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

    @MessagePattern(ProductMsg.UPDATE)
    @UsePipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        skipMissingProperties: false,
    }))
    async updateProduct(@Payload() data: { id: number, productDto: UpdateProductDto }) {
        const { id, productDto } = data;
        console.log('Updating product with ID:', id);
        console.log('Update data:', productDto);
        return this.productService.update(id, productDto);
    }

    @MessagePattern(ProductMsg.PARTIAL_UPDATE)
    @UsePipes(new ValidationPipe())
    async partialUpdateProduct(@Payload() data: { id: number, productDto: Partial<PatchProductDto> }) {
        const { id, productDto } = data;
        return this.productService.partialUpdate(id, productDto);
    }
}   
