import { Body, Controller, Delete, Get, HttpStatus, Patch, Query, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdateDto } from './dto/user.update.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEndpointDescription } from '../common/swagger/user/user.endpoints.description.enum';
import { UserEndpointsResponseDescription } from '../common/swagger/user/user.endpoints.response.description.enum';
import { UserQueryDescription } from '../common/swagger/user/user.query.description.enum';
import { Response } from 'express';
import { User } from '../common/mongo-schemas/user/user.schema';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Patch('update')
    @ApiOperation({summary: UserEndpointDescription.UPDATE})
    @ApiQuery({name: 'userId', required: true, description: UserQueryDescription.USER_ID})
    @ApiResponse({status: HttpStatus.OK, description: UserEndpointsResponseDescription.UPDATE})
    async update(@Query('userId') userId: string , @Body() userDto: UserUpdateDto, @Res() res: Response) {
        try {
            const user = await this.userService.update(userId, userDto);
            const { password, ...rest} = user;
            return res.status(HttpStatus.OK).json(rest);
        }
        catch (error) {
            return res.status(error.status).json({error: error.message});
        }
    }

    @Get()
    @ApiOperation({summary: UserEndpointDescription.GET_USER})
    @ApiQuery({name: 'userId', required: true, description: UserQueryDescription.USER_ID})
    @ApiResponse({status: HttpStatus.OK, description: UserEndpointsResponseDescription.GET_USER})
    async get(@Query('userId') userId: string, @Res() res: Response) {
        try {
            const user = await this.userService.getById(userId);
            const { password, ...rest } = user;
            return res.status(HttpStatus.OK).json(rest);
        }
        catch (error) {
            return res.status(error.status).json({error: error.message});
        }
    }

    @Get('list')
    @ApiOperation({summary: UserEndpointDescription.GET_USER_LIST})
    @ApiResponse({status: HttpStatus.OK, description: UserEndpointsResponseDescription.GET_USER_LIST})
    async getAll(@Res() res: Response) {
        try {
            const users = await this.userService.getAll();
            const results: Partial<User>[] = []
            for (const user of users) {
                const { password, ...rest } = user;
                results.push(rest);
            }
            return res.status(HttpStatus.OK).json(results);
        }
        catch (error) {
            return res.status(error.status).json({error: error.message});
        }
    }

    @Delete('delete/:userId')
    @ApiOperation({summary: UserEndpointDescription.DELETE})
    @ApiQuery({name: 'userId', required: true, description: UserQueryDescription.USER_ID})
    @ApiResponse({status: HttpStatus.NO_CONTENT, description: UserEndpointsResponseDescription.DELETE})
    async delete(@Query('userId') userId: string, @Res() res: Response) {
        try {
            await this.userService.delete(userId);
            return res.status(HttpStatus.NO_CONTENT).json({message: 'User deleted successfully.'});
        }
        catch (error) {
            return res.status(error.status).json({error: error.message});
        }
    }
}