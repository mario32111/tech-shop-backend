import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
// import { UserDto } from './dto/user.dto'; // <-- ¡Eliminar esta línea!
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMsg } from 'src/common/constants';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';

@Controller('')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @MessagePattern(UserMsg.CREATE_USER_PROFILE)
    @UsePipes(new ValidationPipe())
    async createUserProfile(@Payload() userProfileDto: CreateUserProfileDto) {
        return this.userService.create(userProfileDto);
    }

    @MessagePattern(UserMsg.FIND_ALL)
    @UsePipes(new ValidationPipe())
    async findAll() {
        return this.userService.findAll();
    }

    @MessagePattern(UserMsg.FIND_ONE)
    @UsePipes(new ValidationPipe())
    async findOne(@Payload() id: number) { // <-- Corregido: ID es un número
        return this.userService.findOne(id);
    }

    @MessagePattern(UserMsg.UPDATE)
    @UsePipes(new ValidationPipe())
    async update(@Payload() payload: { id: number, userProfileDto: Partial<CreateUserProfileDto> }) {
        return this.userService.update(payload.id, payload.userProfileDto);
    }

    @MessagePattern(UserMsg.DELETE)
    @UsePipes(new ValidationPipe())
    async delete(@Payload() id: number) { // <-- Corregido: ID es un número
        return this.userService.delete(id);
    }
}
