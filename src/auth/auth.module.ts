import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from '../common/common.module';
import { GlobalConfigsService } from '../common/configs/global.configs.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';

@Module({
    controllers: [AuthController],
    imports: [
        UserModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        JwtModule.registerAsync({
            imports: [CommonModule],
            useFactory: (globalConfigService: GlobalConfigsService) => ({
                secret: globalConfigService.jwtSecret,
                signOptions: {
                    expiresIn: globalConfigService.jwtExpiration,
                },
            }),
            inject: [GlobalConfigsService],
        })
    ],
    providers: [AuthService, AuthStrategy],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
