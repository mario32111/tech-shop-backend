import { Body, Controller, Post, Get, Param, Put, Delete } from '@nestjs/common';
import { FlightDto } from './dto/flight.dto';
import { FlightService } from './flight.service';
import { FlightMsg } from 'src/common/constants';
import { MessagePattern, Payload } from '@nestjs/microservices';
//aqui ya no se usa el servicio de pasajeros, si no que se manda a llamar al microservicio
@Controller()
export class FlightController {
    constructor(
        private readonly flightService: FlightService,
    ) { }

    @MessagePattern(FlightMsg.CREATE)
    create(@Payload() flightDto: FlightDto) {
        return this.flightService.create(flightDto);
    }

    @MessagePattern(FlightMsg.FIND_ALL)
    findAll() {
        return this.flightService.findAll();
    }

    @MessagePattern(FlightMsg.FIND_ONE)
    findOne(@Payload() id: string) {
        return this.flightService.findOne(id);
    }

    @MessagePattern(FlightMsg.UPDATE)
    update(@Payload() payload) {
        return this.flightService.update(payload.id, payload.flightDto)
    }

    @MessagePattern(FlightMsg.DELETE)
    delete(@Payload() id: string) {
        return this.flightService.delete(id);
    }

    @MessagePattern(FlightMsg.ADD_PASSENGER)
    //este medodo es un metodo asincrono por que esta llamando al servicionde pasajeros, no solamente al de flight
    addPassenger(@Payload() payload) {
        return this.flightService.addPassenger(payload.flightId, payload.passengerId);
    }
}   
