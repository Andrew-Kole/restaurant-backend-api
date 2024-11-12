import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}
    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userService.findByEmail({
            email: email,
            password: hashedPassword,
        });
        if (!user) {
            throw new UnauthorizedException();
        } else {
            const token = this.jwtService.sign({sub: user._id, username: user.name});
            return {
                token: token,
            }
        }
    }

    async register(payload: RegisterDto) {
        const { password, ...rest } = payload;
        const hashedPassword = await bcrypt.hash(password, 10);
        return await this.userService.create({
            ...rest,
            password: hashedPassword,
        });
    }

    async validate(userId: string) {
        return await this.userService.getById(userId);
    }
}