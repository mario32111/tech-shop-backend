import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/dto/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller('api/v2/auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signIn (@Req() req){
        return await this.authService.signIn(req.user)
    }

    @Post('signup')
    async singUp(@Body() userDto: UserDto){
        return await this.authService.signUp(userDto)
    }
}
