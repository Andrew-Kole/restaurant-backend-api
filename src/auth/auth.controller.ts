import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterDto } from './dto/register.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthEndpointDescription } from '../common/swagger/auth/auth.endpoints.description.enum';
import { Public } from '../common/decorators/access/public.endpoint.decorator';


@ApiTags('auth')
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    @ApiOperation({summary: AuthEndpointDescription.LOGIN})
    @ApiResponse({status: HttpStatus.OK, description: 'Login OK'})
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        const response = await this.authService.login(loginDto);
        return res.status(HttpStatus.OK).json(response);
    }

    @Public()
    @Post('register')
    @ApiOperation({summary: AuthEndpointDescription.REGISTER})
    @ApiResponse({status: HttpStatus.OK, description: 'Register OK'})
    async register(@Body() payload: RegisterDto, @Res() res: Response) {
        const user = await this.authService.register(payload);
        const { password, ...rest } = user;
        console.log(rest)
        return res.status(HttpStatus.CREATED).json(rest);
    }
}