import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { UserMsg } from 'src/common/constants';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
    private _clientProxyUsers: ClientProxy;

    constructor(private readonly clientProxy: ClientProxySuperFlights, 
        private readonly jwtService: JwtService,
    ){
        this._clientProxyUsers = this.clientProxy.clientProxyUsers();
    }

    //metodo para validar las creedenciales de usuario
    async validateUser(username: string, password: string): Promise<any>{
        const user = await this._clientProxyUsers.send(UserMsg.VALID_USER, {username, password}).toPromise();
        if (user) return user;
        return null;
    }

    //metodo para firmar el payload
    async signIn(user:any){
        const payload ={
            username: user.username,
            sub: user._id,
        };

        return {access_token: this.jwtService.sign(payload)}
    }

    //metodo para registrarse
    async signUp(userDto: UserDto){
        return await this._clientProxyUsers.send(UserMsg.CREATE, userDto).toPromise();
    }
}
