import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hashPassword } from '../common/utils/password.util';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}
    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const user = await this.userService.findByEmail(email);
        if (!user || !(await comparePassword(password, user.password))) {
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
        const hashedPassword = await hashPassword(password)
        return await this.userService.create({
            ...rest,
            password: hashedPassword,
        });
    }

    async validate(userId: string) {
        return await this.userService.getById(userId);
    }
}