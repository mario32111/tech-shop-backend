import { IsString, IsNotEmpty, IsInt, IsEmail, IsOptional, IsDateString } from 'class-validator';

export class CreateUserProfileDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsInt()
    @IsNotEmpty()
    authId: number;

    @IsOptional()
    @IsDateString()
    birthDate?: Date; // Si se envía desde el front-end

    @IsOptional()
    @IsString()
    gender?: string; // Si se envía desde el front-end
}
