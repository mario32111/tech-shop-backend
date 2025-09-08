import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientProxyTechShop } from 'src/common/proxy/client-proxy';
import { ProductDto } from './dto/product.dto';
import { ProductMsg } from 'src/common/constants';
import { IProduct } from 'src/common/interface/flight.interface'; // Importa IProduct
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/authGuards/jwt.auth.guard';

@ApiTags('product')
//proteccion de endpoinds con jwt
@UseGuards(JwtAuthGuard)
@Controller('api/v1/product')
export class ProductController {
    private _clientProxyProduct: ClientProxy;

    constructor(private readonly clientProxy: ClientProxyTechShop) {
        this._clientProxyProduct = this.clientProxy.clientProxyProducts();
    }

    private sendAndHandle<T>(pattern: string, data: any): Observable<T> {
        return new Observable<T>((subscriber) => {
            this._clientProxyProduct.send<T>(pattern, data).subscribe({
                next: (response) => {
                    console.log('Response from microservice:', response);
                    subscriber.next(response);
                    subscriber.complete();
                },
                error: (err) => {
                    console.error('Error from microservice:', err);
                    subscriber.error(err);
                },
            });
        });
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() flighDto: ProductDto): Observable<IProduct> {
        return this.sendAndHandle<IProduct>(ProductMsg.CREATE, flighDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Observable<IProduct[]> {
        return this.sendAndHandle<IProduct[]>(ProductMsg.FIND_ALL, '');
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Observable<IProduct> {
        return this.sendAndHandle<IProduct>(ProductMsg.FIND_ONE, id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() flighDto: ProductDto): Observable<IProduct> {
        return this.sendAndHandle<IProduct>(ProductMsg.UPDATE, { id, flighDto });
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
        return this.sendAndHandle<any>(ProductMsg.DELETE, id);
    }

}