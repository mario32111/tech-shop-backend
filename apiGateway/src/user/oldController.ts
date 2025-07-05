import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { UserDto } from './dto/user.dto';
import { Observable } from 'rxjs';
import { IUser } from 'src/common/interface/user.interface';
import { UserMsg } from 'src/common/constants';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('api/v2/user')
export class UserController {
    private _clientProxyUser: ClientProxy;

    constructor(private readonly clientProxy: ClientProxySuperFlights) {
        this._clientProxyUser = this.clientProxy.clientProxyUsers();
    }

    @Post()
    create(@Body() userDto: UserDto): Observable<IUser> {
        return new Observable<IUser>((subscriber) => {
            this._clientProxyUser.send(UserMsg.CREATE, userDto).subscribe({
                next: (response) => {
                    console.log('Response from microservice:', response);
                    subscriber.next(response);
                    subscriber.complete();
                },
                error: (err) => {
                    console.error('Error from microservice:', err);
                    subscriber.error(err);
                },
            });
        });
    }

    @Get()
    findAll(): Observable<IUser[]> {
        return new Observable<IUser[]>((subscriber) => {
            this._clientProxyUser.send(UserMsg.FIND_ALL, '').subscribe({
                next: (response) => {
                    console.log('Response from microservice:', response);
                    subscriber.next(response);
                    subscriber.complete();
                },
                error: (err) => {
                    console.error('Error from microservice:', err);
                    subscriber.error(err);
                },
            });
        });
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IUser> {
        return new Observable<IUser>((subscriber) => {
            this._clientProxyUser.send(UserMsg.FIND_ONE, id).subscribe({
                next: (response) => {
                    console.log('Response from microservice:', response);
                    subscriber.next(response);
                    subscriber.complete();
                },
                error: (err) => {
                    console.error('Error from microservice:', err);
                    subscriber.error(err);
                },
            });
        });
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() userDto: UserDto): Observable<IUser> {
        return new Observable<IUser>((subscriber) => {
            this._clientProxyUser.send(UserMsg.UPDATE, { id, userDto }).subscribe({
                next: (response) => {
                    console.log('Response from microservice:', response);
                    subscriber.next(response);
                    subscriber.complete();
                },
                error: (err) => {
                    console.error('Error from microservice:', err);
                    subscriber.error(err);
                },
            });
        });
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
        return new Observable<any>((subscriber) => {
            this._clientProxyUser.send(UserMsg.DELETE, id).subscribe({
                next: (response) => {
                    console.log('Response from microservice:', response);
                    subscriber.next(response);
                    subscriber.complete();
                },
                error: (err) => {
                    console.error('Error from microservice:', err);
                    subscriber.error(err);
                },
            });
        });
    }
}