import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { IPassenger } from 'src/common/interface/passenger.interface';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { PassengerDto } from './dto/passenger.dto';
import { PassengerMsg } from 'src/common/constants';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@ApiTags('passengers')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/passenger')
export class PassengerController {
    private _clientProxyPassenger: ClientProxy;

    constructor(private readonly clientProxy: ClientProxySuperFlights) {
        this._clientProxyPassenger = this.clientProxy.clientProxyPassengers();
    }

    private sendAndHandle<T>(pattern: string, data: any): Observable<T> {
        return new Observable<T>((subscriber) => {
            this._clientProxyPassenger.send<T>(pattern, data).subscribe({
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

    @Post()
    create(@Body() passengerDto: PassengerDto): Observable<IPassenger> {
        return this.sendAndHandle<IPassenger>(PassengerMsg.CREATE, passengerDto);
    }

    @Get()
    findAll(): Observable<IPassenger[]> {
        return this.sendAndHandle<IPassenger[]>(PassengerMsg.FIND_ALL, '');
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IPassenger> {
        return this.sendAndHandle<IPassenger>(PassengerMsg.FIND_ONE, id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() passengerDto: PassengerDto): Observable<IPassenger> {
        return this.sendAndHandle<IPassenger>(PassengerMsg.UPDATE, { id, passengerDto });
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
        return this.sendAndHandle<any>(PassengerMsg.DELETE, id);
    }
}