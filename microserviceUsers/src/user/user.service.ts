import { Injectable, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { UserProfile } from './models/user-profile.model';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { FindOptions } from 'sequelize'; // Importa FindOptions para la tipificación correcta

@Injectable()
export class UserService {

    constructor(
        @InjectModel(UserProfile)
        private userProfileModel: typeof UserProfile,
    ) { }

    async create(userProfileDto: CreateUserProfileDto): Promise<UserProfile> {
        try {
            // Sequelize's create method handles DTO directly if properties match
            const userProfile = await this.userProfileModel.create(userProfileDto as any);
            return userProfile;
        } catch (error) {
            console.error('Error creando el perfil de usuario en el Microservicio de Usuarios:', error);
            throw new RpcException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Fallo al crear el perfil de usuario en el microservicio de Usuarios',
            });
        }
    }

    async findAll(): Promise<UserProfile[]> {
        return this.userProfileModel.findAll();
    }

    async findOne(id: number): Promise<UserProfile | null> {
        return this.userProfileModel.findByPk(id);
    }

    async findByUsername(username: string): Promise<UserProfile | null> {
        // Corrección del error TS2769: Especifica el tipo de las opciones de búsqueda
        const options: FindOptions<UserProfile> = { where: { username } };
        return this.userProfileModel.findOne(options);
    }

    async update(id: number, userProfileDto: Partial<CreateUserProfileDto>): Promise<UserProfile | null> {
        const [affectedCount, affectedRows] = await this.userProfileModel.update(userProfileDto, {
            where: { id },
            returning: true,
        });

        if (affectedCount > 0 && affectedRows && affectedRows.length > 0) {
            return affectedRows[0];
        }
        return null;
    }

    async delete(id: number): Promise<{ status: number; message: string }> {
        const deletedRows = await this.userProfileModel.destroy({ where: { id } });
        if (deletedRows > 0) {
            return { status: HttpStatus.OK, message: 'Usuario eliminado exitosamente' };
        }
        throw new RpcException({
            status: HttpStatus.NOT_FOUND,
            message: 'Usuario no encontrado para eliminación',
        });
    }
}
