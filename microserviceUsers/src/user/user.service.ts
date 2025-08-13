import { HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/common/interface/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { UserProfile } from '../user/models/user-profile.model';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
@Injectable()
export class UserService {

    constructor(
        @InjectModel(UserProfile)
        private userProfileModel: typeof UserProfile,
    ) { }

    async update(id: string, userProfileDto: CreateUserProfileDto): Promise<IUser | null> {
        const userProfile = await this.userProfileModel.findByIdAndUpdate(id, userProfileDto, { new: true });
        return userProfile;
    }

    async 

    async findByUsername(username: string) {
        return await this.userProfileModel.findOne({ username });
    }

    async create(userProfileDto: CreateUserProfileDto): Promise<IUser> {
        const userProfile = await this.userProfileModel.create(userProfileDto);
        return userProfile;
    }

    async findAll(): Promise<IUser[]> {
        return await this.userProfileModel.find();
    }

    async findOne(id: string): Promise<IUser | null> {
        return await this.userProfileModel.findById(id);
    }

    async delete(id: string): Promise<{ status: number, message: string }> {
        await this.userProfileModel.findByIdAndDelete(id);
        return { status: HttpStatus.OK, message: 'User deleted successfully' };
    }

}
