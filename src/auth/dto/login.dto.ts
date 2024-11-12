import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserPayloadFieldsDescription } from '../../common/swagger/user/user.payload.fields.description.enum';

export class LoginDto {
    @ApiProperty({description: UserPayloadFieldsDescription.USER_EMAIL})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({description: UserPayloadFieldsDescription.USER_PASSWORD})
    @IsNotEmpty()
    password: string;
}