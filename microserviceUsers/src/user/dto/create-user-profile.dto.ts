// microservice_users/src/users/dto/create-user-profile.dto.ts
import { IsString, IsNotEmpty, IsInt, IsOptional, IsDate } from 'class-validator';

export class CreateUserProfileDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    authId: number;

    @IsOptional()
    @IsDate()
    birthDate?: Date;

    @IsOptional()
    @IsString()
    gender?: string;
}