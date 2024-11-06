import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.create.dto';
import { UserUpdateDto } from './dto/user.update.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Post('create')
    async create(@Body() userDto: CreateUserDto) {
        return this.userService.create(userDto);
    }

    @Patch('update/:userId')
    async update(@Param() userParams: any, @Body() userDto: UserUpdateDto) {
        return this.userService.update(userParams.userId, userDto);
    }

    @Get(':userId')
    async get(@Param() userParams: any) {
        return this.userService.getById(userParams.userId);
    }

    @Get()
    async getAll() {
        return this.userService.getAll();
    }

    @Patch('delete/:userId')
    async delete(@Param() userId: any) {
        return this.userService.delete(userId.userId);
    }
}