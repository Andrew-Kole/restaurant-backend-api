import { convertMongoException } from '../../libs/mongo.exceptions.converter';
import { NotFoundException } from '@nestjs/common';
import { ErrorMessage } from '../../error-messages/error.message.enum';

export function MongoErrorHandler() {
    return function (constructor: Function) {
        const originalMethods = Object.getOwnPropertyNames(constructor.prototype);
        for (const methodName of originalMethods) {
            if (methodName === 'constructor') {
                continue;
            }

            const originalMethod = constructor.prototype[methodName];
            if (typeof originalMethod === 'function') {
                constructor.prototype[methodName] = async function (...args: any[]) {
                    try {
                        const result = await originalMethod.apply(this, args);
                        if (!result) {
                            throw new NotFoundException(ErrorMessage.NOT_FOUND);
                        }
                        return result;
                    }
                    catch (error) {
                        convertMongoException(error);
                    }
                }
            }
        }
    }
}