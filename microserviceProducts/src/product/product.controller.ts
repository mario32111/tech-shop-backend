import { Body, Controller, Post, Get, Param, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductMsg } from 'src/common/constants';
import { MessagePattern, Payload } from '@nestjs/microservices';
//aqui ya no se usa el servicio de pasajeros, si no que se manda a llamar al microservicio
@Controller()
export class PoductController {
    constructor(
        private readonly productService: ProductService,
    ) { }

}   
