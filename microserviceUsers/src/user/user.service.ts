import { HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { USER } from 'src/common/models/models'
import { IUser } from 'src/common/interface/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) {}

    async findByUsername(username: string){
        return await this.model.findOne({ username });
    }

    async checkPassword(password: string, passwordDB: string): Promise<boolean>{
        return await bcrypt.compare(password, passwordDB);
    }
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }


    async create(userDto: UserDto): Promise<IUser> {
        const hash = await this.hashPassword(userDto.password);
        const newUser = new this.model({...userDto, password: hash});
        return await newUser.save();
    }   

    async findAll(): Promise<IUser[]> {
        return await this.model.find();
    }

    async findOne(id: string): Promise<IUser | null> {
        return await this.model.findById(id);
    }

    async update(id: string, userDto: UserDto): Promise<IUser | null> {
        const hash = await this.hashPassword(userDto.password)
        const user = {...userDto, password: hash}
        return await this.model.findByIdAndUpdate(id, user, {new: true}); 
    }

    async delete(id: string): Promise<{ status: number, message: string }> {
        await this.model.findByIdAndDelete(id);
        return { status: HttpStatus.OK, message: 'User deleted successfully' };
    }

}
