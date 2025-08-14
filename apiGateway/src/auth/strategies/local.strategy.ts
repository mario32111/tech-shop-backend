// En el API Gateway, src/auth/strategies/local.strategy.ts

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local'
import { ClientProxyTechShop } from 'src/common/proxy/client-proxy';
import { AuthMsg, UserMsg } from 'src/common/constants';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from "@nestjs/microservices"; // <-- Importa ClientProxy

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    // 1. CORRECCIÓN AQUÍ: El tipo de la variable debe ser ClientProxy, no ClientProxyTechShop.
    private clientProxyAuth: ClientProxy; 

    constructor(private readonly clientProxy: ClientProxyTechShop) {
        super();
        this.clientProxyAuth = this.clientProxy.clientProxyAuth();
    }

    async validate(username: string, password: string): Promise<any> {
/*         try {
            // 2. CORRECCIÓN AQUÍ: Ahora TypeScript sabe que clientProxyAuth tiene el método .send()
            const user = await lastValueFrom(
                this.clientProxyAuth.send(AuthMsg.VALIDATE_USER, { username, password })
            );
            
            if (!user) {
                throw new UnauthorizedException();
            }
        
            return user;
        } catch (error) {
            throw new UnauthorizedException(error.message);
        } */
    }
}