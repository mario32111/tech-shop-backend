import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interface/flight.interface';
import { FLIGHT } from 'src/common/models/models';
import { FlightDto } from './dto/flight.dto';

@Injectable()
export class FlightService {
    constructor(@InjectModel(FLIGHT.name) private readonly model: Model<IFlight>) { }

    async create(flightDto: FlightDto): Promise<IFlight> {
        const newFlight = new this.model(flightDto);
        return newFlight.save();
    }

    async findAll(): Promise<IFlight[]> {
        return await this.model.find().populate('passengers');;
    }

    async findOne(id: string): Promise<IFlight | null> {
        return await this.model.findById(id).populate('passengers');
    }

    async update(id: string, flighDto: FlightDto): Promise<IFlight | null> {
        return await this.model.findByIdAndUpdate(id, flighDto, { new: true });
    }

    async delete(id: string): Promise<{ status: number, message: string }> {
        await this.model.findByIdAndDelete(id);
        return { status: HttpStatus.OK, message: 'Flight deleted successfully' };
    }

    async addPassenger(flightId: string, passengerId: string): Promise<IFlight | null> {
        return await this.model.findByIdAndUpdate(flightId, 
        {
            //esto es para que si el id ya existe no lo vuelva a agregar, sololamente lo sustituye
            $addToSet: { passengers: passengerId }
        }, 
        { new: true }).populate('passengers');
        //el popuate es para que al momento de hacer la peticion tambien devuelva la informacion del pasajero 
    }
}
