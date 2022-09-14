import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { User } from 'src/auth/decorator/user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    
    @UseGuards(JwtGuard)
    @Get('profile')
    getProfile(@User('id') id: number) {
        return this.userService.getOneUser(id)
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    updateUser(@Body() updateUserDto: UpdateUserDTO, @User('id') userId:number,
    @Param('id') id: number) {
        return this.userService.updateOneUser(updateUserDto, userId, id)
    }

    @Get()
    getAll() {
        return this.userService.getAllUsers()
    }
    


}

