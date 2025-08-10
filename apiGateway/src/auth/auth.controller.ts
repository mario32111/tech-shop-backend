import { ClientProxy } from '@nestjs/microservices';
import { ClientProxyTechShop } from 'src/common/proxy/client-proxy';
import { Observable } from 'rxjs';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/authGuards/jwt.auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthMsg } from 'src/common/constants';
import { RegisterAuthUserDto } from './dto/register-auth-user.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LogoutDto } from './dto/logout.dto';


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
        return this.sendAndHandle<any>(AuthMsg.LOGIN, LoginUserDto);
    }
    @Post('register')
    register(@Body() registerUserDto: RegisterAuthUserDto): Observable<any> {
        return this.sendAndHandle<any>(AuthMsg.REGISTER, registerUserDto);
    }

    @Post('validate-token')
    validateToken(@Body() tokenDto: ValidateTokenDto): Observable<any> {
        return this.sendAndHandle<any>(AuthMsg.VALIDATE_TOKEN, tokenDto);
    }

    @Post('refresh-token')
    refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Observable<any> {
        return this.sendAndHandle<any>(AuthMsg.REFRESH_TOKEN, refreshTokenDto);
    }

    @Post('logout')
    logout(@Body() logoutDto: LogoutDto): Observable<any> {
        return this.sendAndHandle<any>(AuthMsg.LOGOUT, logoutDto);
    }
}
