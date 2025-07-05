import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { FlightDto } from './dto/flight.dto';
import { FlightMsg, PassengerMsg } from 'src/common/constants';
import { IFlight } from 'src/common/interface/flight.interface'; // Importa IFlight
import { Observable, from, lastValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { IPassenger } from 'src/common/interface/passenger.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@ApiTags('flights')
//proteccion de endpoinds con jwt
@UseGuards(JwtAuthGuard)
@Controller('api/v2/flight')
export class FlightController {
    private _clientProxyFlight: ClientProxy;
    private _clientProxyPassenger: ClientProxy;

    constructor(private readonly clientProxy: ClientProxySuperFlights) {
        this._clientProxyFlight = this.clientProxy.clientProxyFlights();
        this._clientProxyPassenger = this.clientProxy.clientProxyPassengers();
    }

    private sendAndHandle<T>(pattern: string, data: any): Observable<T> {
        return new Observable<T>((subscriber) => {
            this._clientProxyFlight.send<T>(pattern, data).subscribe({
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
    create(@Body() flighDto: FlightDto): Observable<IFlight> {
        return this.sendAndHandle<IFlight>(FlightMsg.CREATE, flighDto);
    }

    @Get()
    findAll(): Observable<IFlight[]> {
        return this.sendAndHandle<IFlight[]>(FlightMsg.FIND_ALL, '');
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IFlight> {
        return this.sendAndHandle<IFlight>(FlightMsg.FIND_ONE, id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() flighDto: FlightDto): Observable<IFlight> {
        return this.sendAndHandle<IFlight>(FlightMsg.UPDATE, { id, flighDto });
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
        return this.sendAndHandle<any>(FlightMsg.DELETE, id);
    }

    @Post(':flightId/passenger/:passengerId')
    async addPassenger(
        @Param('flightId') flightId: string,
        @Param('passengerId') passengerId: string,
    ): Promise<Observable<IFlight>> {
        try {
            const passenger: IPassenger = await lastValueFrom(this._clientProxyPassenger.send<IPassenger>(PassengerMsg.FIND_ONE, passengerId));

            if (!passenger) {
                throw new HttpException('Passenger Not Found', HttpStatus.NOT_FOUND);
            }

            return this.sendAndHandle<IFlight>(FlightMsg.ADD_PASSENGER, { flightId, passengerId });
        } catch (error) {
            return from(Promise.reject(error)); // Convertir el error en un Observable
        }
    }
}