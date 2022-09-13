import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserEntity } from "src/database/entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor( config: ConfigService, 
        @InjectRepository(UserEntity) private UserRepo: Repository<UserEntity>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET')
        })
    }

    async validate(payload: {id: number, email: string, isAdmin: boolean}) {
        

        const user = await this.UserRepo.findOne({
            where: {id: payload.id}
        })

        delete user.password

        return user
    }
}