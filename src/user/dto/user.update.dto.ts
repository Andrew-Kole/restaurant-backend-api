import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserPayloadFieldsDescription } from '../../common/swagger/user/user.payload.fields.description.enum';

export class UserUpdateDto {

    @ApiProperty({description: UserPayloadFieldsDescription.USER_NAME})
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiProperty({description: UserPayloadFieldsDescription.USER_EMAIL})
    @IsOptional()
    @IsString()
    password: string;

    @ApiProperty({description: UserPayloadFieldsDescription.USER_PASSWORD})
    @IsOptional()
    @IsString()
    name: string;
}