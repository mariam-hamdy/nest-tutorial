import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() registerDto: RegisterDTO) {
        return this.authService.registerUser(registerDto)
    }

    @Post('login')
    login(@Body() loginDto: LoginDTO) {
        return this.authService.loginUser(loginDto)
    }
}
