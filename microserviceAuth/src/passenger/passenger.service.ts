import { HttpStatus, Injectable } from '@nestjs/common';
import { PassengerDto } from './dto/passenger.dto';
import { IPassenger } from 'src/common/interface/passenger.interface';
import { InjectModel } from '@nestjs/mongoose';
import { PASSENGER } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class PassengerService {
    constructor(@InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>){}

    async create(passengerDto: PassengerDto): Promise<IPassenger> {
        const newPassenger = new this.model(passengerDto);
        return await newPassenger.save(); 
    }

    async findAll(): Promise<IPassenger[]> {
        return await this.model.find();
    }

    async findOne(id: string): Promise<IPassenger | null> {
        return await this.model.findById(id);
    }

    async update(id: string, passengerDto: PassengerDto): Promise<IPassenger | null> {
        return await this.model.findByIdAndUpdate(id, passengerDto, {new: true});
    }

    async delete(id: string): Promise<{ status: number, message: string }> {
        await this.model.findByIdAndDelete(id);
        return { status: HttpStatus.OK, message: 'Passenger deleted successfully' };
    }
}
