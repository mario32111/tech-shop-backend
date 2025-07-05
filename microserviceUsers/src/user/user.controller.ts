import { Controller } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMsg } from 'src/common/constants';

//aqui el controlador ya no tiene ninguna ruta
@Controller('')

export class UserController {
    constructor(private readonly userService: UserService) {}
    //se cambian los metodos convencionalees por estos nuevos decoradores

    //Este decorador define un manejador para un mensaje específico que un microservicio recibirá y procesará
    @MessagePattern(UserMsg.CREATE)
    //ya no se recibe un body, se recibe un payload, lo demas se mantiene igual
    create(@Payload() UserDto: UserDto) {
        return this.userService.create(UserDto);
    }

    @MessagePattern(UserMsg.FIND_ALL)
    findAll() {
        return this.userService.findAll();
    }

    @MessagePattern(UserMsg.FIND_ONE)
    findOne(@Payload() id: string) {
        return this.userService.findOne(id);
    }

    //id: string, @Body() UserDto: UserDto quite esto por que ya viene dentro del payload
    @MessagePattern(UserMsg.UPDATE)
    update(@Payload('id') payload: any) {
        return this.userService.update(payload.id, payload.UserDto);
    }

    @MessagePattern(UserMsg.UPDATE)
    delete(@Payload() id: string) {
        return this.userService.delete(id);
    }

    //endpoint de validar usuario
    @MessagePattern(UserMsg.VALID_USER)
    async validateUser(@Payload() payload){
        const user = await this.userService.findByUsername(payload.username)

        if (!user) return null;

        const isValidPassword = await this.userService.checkPassword(payload.password, user.password);

        if (isValidPassword) return user;
        return null;
    }
}
