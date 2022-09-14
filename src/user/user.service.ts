import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NOTFOUND } from 'dns';
import { UserEntity } from 'src/database/entity/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private UserRepo: Repository<UserEntity>) {}

    async getOneUser(id: number) {
        
        const user = await this.UserRepo.findOne({
            where: {id: id}
        })

        if(!user) {
            throw new HttpException(NOTFOUND, HttpStatus.NOT_FOUND)
        }

        delete user.password

        return {user}
    }

    async updateOneUser(updateUserDto: UpdateUserDTO, userId: number, id: number) {
        
        if(id!=userId) {
            throw new HttpException("the param id not equal the userId", HttpStatus.BAD_REQUEST)
        }
        
        //change user password
        const password = updateUserDto.password
        if(password) {
            const newPasswordHash = await this.generateHash(password)
            const user = await this.UserRepo.findOne({
                where: {id:userId}
            })
            const isSame = await bcrypt.compare(newPasswordHash, user.password)
            if(!isSame) {
                throw new HttpException(BadRequestException, HttpStatus.BAD_REQUEST)
            }
            updateUserDto.password = newPasswordHash
        }
        
        
        
        const updateUser = await this.UserRepo.update(userId, updateUserDto)

        if(!updateUser) {
            throw new HttpException(NOTFOUND, HttpStatus.NOT_FOUND)
        }

        const finalresult = await this.UserRepo.findOneOrFail({
            where: {id:userId}
        })

        delete finalresult.password
        delete finalresult.isAdmin
        return {updatedUser: finalresult}

    }

    async getAllUsers() {

        const users = await this.UserRepo.find()

        return {users, count: users.length}
    }


    async generateHash(password: string) {
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        return passwordHash
    }

}
