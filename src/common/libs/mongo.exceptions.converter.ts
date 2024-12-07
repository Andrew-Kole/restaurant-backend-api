import {MongoError} from 'mongodb';
import { BadRequestException, ConflictException, InternalServerErrorException } from '@nestjs/common';

export function convertMongoException(error: Error) {
    if (error instanceof MongoError) {
        switch (error.code) {
            case 11000:
                throw new ConflictException(error.message);
            case 121:
                throw new BadRequestException(error.message);
            default:
                throw new InternalServerErrorException(error.message);
        }
    }
    else {
        throw error;
    }
}