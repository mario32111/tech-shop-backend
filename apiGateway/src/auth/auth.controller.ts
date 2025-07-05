import { Controller } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientProxyTechShop } from 'src/common/proxy/client-proxy';
import { Observable } from 'rxjs';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/authGuards/jwt.auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';


@ApiTags('auth')
//proteccion de endpoinds con jwt
@UseGuards(JwtAuthGuard)
@Controller('api/v1/auth')
export class AuthController {
    private _clientProxyProduct: ClientProxy;

    constructor(private readonly clientProxy: ClientProxyTechShop) {
        this._clientProxyProduct = this.clientProxy.clientProxyAuth();
    }

    private sendAndHandle<T>(pattern: string, data: any): Observable<T> {
        return new Observable<T>((subscriber) => {
            this._clientProxyProduct.send<T>(pattern, data).subscribe({
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

    @Post('login')
    login(@Body() LoginUserDto: LoginUserDto): Observable<any> {
        return this.sendAndHandle<any>('LOGIN', LoginUserDto);
    }
    @Post('register')
    register(@Body() registerUserDto: any): Observable<any> {
        return this.sendAndHandle<any>('REGISTER', registerUserDto);
    }

    @Post('validate-token')
    validateToken(@Body() tokenDto: any): Observable<any> {
        return this.sendAndHandle<any>('VALIDATE_TOKEN', tokenDto);
    }

    @Post('refresh-token')
    refreshToken(@Body() refreshTokenDto: any): Observable<any> {
        return this.sendAndHandle<any>('REFRESH_TOKEN', refreshTokenDto);
    }

    @Post('logout')
    logout(@Body() logoutDto: any): Observable<any> {
        return this.sendAndHandle<any>('LOGOUT', logoutDto);
    }
}
