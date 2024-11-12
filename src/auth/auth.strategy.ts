import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { GlobalConfigsService } from '../common/configs/global.configs.service';
import { TokenPayload } from '../common/auth/payloads/token.payload';
import { AuthService } from './auth.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly globalConfigsService: GlobalConfigsService,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: globalConfigsService.jwtSecret,
        });
    }

    async validate(payload: TokenPayload) {
        const user = await this.authService.validate(payload.sub);
        if (!user || user.name !== payload.username || user.deleted) {
            throw new UnauthorizedException();
        }
        return {
            userId: payload.sub,
            username: payload.username,
        }
    }
}
