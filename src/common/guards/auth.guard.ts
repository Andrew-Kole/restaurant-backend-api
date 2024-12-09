import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../auth/auth.service';
import { Request } from 'express';
import { ErrorMessage } from '../error-messages/error.message.enum';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
        private readonly authService: AuthService,
    ) {}

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>();
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
        if (isPublic) {
            return true;
        }

        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException(ErrorMessage.NOT_AUTHORIZED)
        }

        const token = authHeader.split(' ')[1];

        try {
            const payload = this.jwtService.verify(token);
            const user = await this.authService.validate(payload.sub);
            if (!user) {
                throw new UnauthorizedException(ErrorMessage.NOT_AUTHORIZED);
            }
            req.user = user;
            return true;
        }
        catch (error) {
            throw new UnauthorizedException(error);
        }
    }
}