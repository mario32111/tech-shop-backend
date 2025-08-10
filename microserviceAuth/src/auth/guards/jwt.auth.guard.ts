import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()AuthGuard
export class JwtAuthGuard extends ('jwt'){
    
}