import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { UserDto } from './dto/user.dto';
import { Observable } from 'rxjs';
import { IUser } from 'src/common/interface/user.interface';
import { UserMsg } from 'src/common/constants';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/user')
export class UserController {
    //Declara una propiedad privada para almacenar la instancia de ClientProxy, 
    //que se utiliza para comunicarse con el microservicio de usuarios.
    private _clientProxyUser: ClientProxy;


    //El constructor recibe una instancia de ClientProxySuperFlights 
    // y la utiliza para obtener la instancia de ClientProxy para el microservicio de usuarios.
    constructor(private readonly clientProxy: ClientProxySuperFlights) {
        this._clientProxyUser = this.clientProxy.clientProxyUsers();
    }

    // Es un tipo genérico que nos permite especificar el tipo de datos que el microservicio devolverá
    //pattern: string: Es el patrón de mensaje para RabbitMQ
    //data: any: Son los datos que se enviarán al microservicio.
    //Observable<T>: Es el tipo de valor que devuelve la función, en este caso, un observable.
    private sendAndHandle<T>(pattern: string, data: any): Observable<T> {
        // Crea un nuevo Observable personalizado.
        return new Observable<T>((subscriber) => {
            //Envía un mensaje al microservicio y se suscribe a la respuesta.
            this._clientProxyUser.send<T>(pattern, data).subscribe({
                //Maneja la respuesta exitosa del microservicio
                next: (response) => {
                    console.log('Response from microservice:', response);
                    subscriber.next(response);
                    subscriber.complete();
                },
                // Maneja los errores del microservicio.
                error: (err) => {
                    console.error('Error from microservice:', err);
                    subscriber.error(err);
                },
            });
        });
    }

    //En cada endpoint, ahora llamamos a this.sendAndHandle() con el patrón de mensaje y los datos correspondientes
    @Post()
    create(@Body() userDto: UserDto): Observable<IUser> {
        return this.sendAndHandle<IUser>(UserMsg.CREATE, userDto);
    }

    @Get()
    findAll(): Observable<IUser[]> {
        return this.sendAndHandle<IUser[]>(UserMsg.FIND_ALL, '');
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IUser> {
        return this.sendAndHandle<IUser>(UserMsg.FIND_ONE, id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() userDto: UserDto): Observable<IUser> {
        return this.sendAndHandle<IUser>(UserMsg.UPDATE, { id, userDto });
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
        return this.sendAndHandle<any>(UserMsg.DELETE, id);
    }
}