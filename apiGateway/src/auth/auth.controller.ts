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
// IMPORTANTE: Eliminamos @UseGuards(JwtAuthGuard) de aquí.
// Las rutas que necesitan protección se protegerán individualmente.
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

    // Si 'validate-token' requiere que el usuario ya tenga un token válido (e.g., para verificarlo),
    // entonces SÍ debería estar protegido. Si es para validar un token "candidato", no.
    // Asumo que es para validar un token existente, por lo que lo protegemos.
    @UseGuards(JwtAuthGuard)
    @Post('validate-token')
    validateToken(@Body() tokenDto: ValidateTokenDto): Observable<any> {
        return this.sendAndHandle<any>(AuthMsg.VALIDATE_TOKEN, tokenDto);
    }

    // 'refresh-token' a menudo requiere un token de refresco válido,
    // que también podría requerir autenticación para el token de acceso.
    @UseGuards(JwtAuthGuard)
    @Post('refresh-token')
    refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Observable<any> {
        return this.sendAndHandle<any>(AuthMsg.REFRESH_TOKEN, refreshTokenDto);
    }

    // 'logout' podría o no requerir un token válido, dependiendo de cómo lo implementes.
    // Si el logout invalida el token actual, probablemente necesites el guard.
    @UseGuards(JwtAuthGuard)
    @Post('logout')
    logout(@Body() logoutDto: LogoutDto): Observable<any> {
        return this.sendAndHandle<any>(AuthMsg.LOGOUT, logoutDto);
    }
}