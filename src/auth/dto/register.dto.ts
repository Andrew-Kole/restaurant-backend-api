import { ApiProperty } from '@nestjs/swagger';
import { UserPayloadFieldsDescription } from '../../common/swagger/user/user.payload.fields.description.enum';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
    @ApiProperty({description: UserPayloadFieldsDescription.USER_NAME})
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({description: UserPayloadFieldsDescription.USER_EMAIL})
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({description: UserPayloadFieldsDescription.USER_PASSWORD})
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}

