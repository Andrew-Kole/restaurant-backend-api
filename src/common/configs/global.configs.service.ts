import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GlobalConfigsService {
    constructor(private readonly configService: ConfigService) {}

    get jwtSecret() {
        return this.configService.get<string>('JWT_SECRET');
    }

    get jwtExpiration() {
        return this.configService.get('TOKEN_EXPIRATION');
    }
}