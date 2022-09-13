import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entity/user.entity';
import { Repository } from 'typeorm';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserEntity) private UserRepo: Repository<UserEntity>,
    private config: ConfigService, private jwtService: JwtService) {}

    async registerUser(registerDto: RegisterDTO) {
        
        const passwordHash = await this.generateHash(registerDto.password)
        registerDto.password = passwordHash

        const user = await this.UserRepo.save(registerDto)
        
        const token = this.signToken(user.id, user.email, user.isAdmin)
        
        return {access_token: token}
        

    }

    async loginUser(loginDto: LoginDTO) {
        const {email, password} = loginDto

        const user = await this.UserRepo.findOne({
            where: {
                email: email
            }
        })

        if(!user) {
            throw new HttpException(UnauthorizedException, HttpStatus.UNAUTHORIZED)
        }

        const isSame = await bcrypt.compare(password, user.password)

        if(!isSame) {
            throw new HttpException(UnauthorizedException, HttpStatus.UNAUTHORIZED)
        }
        const token = this.signToken(user.id, user.email, user.isAdmin)

        return {access_token: token}
    }


    async generateHash(password: string) {
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        return passwordHash
    }

    signToken(id: number, email: string, isAdmin: boolean) {
        
        const payload = {id, email, isAdmin}

        const token = this.jwtService.sign(
            payload,
            {
                secret: this.config.get('JWT_SECRET'),
                expiresIn: this.config.get('JWT_LIFETIME')
            }
        )

        return token



    }
}
