import { convertMongoException } from '../../libs/mongo.exceptions.converter';

export function MongoErrorHandler() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            try {
                await originalMethod.apply(this, args);
            }
            catch (error) {
                convertMongoException(error);
            }
        };
        return descriptor;
    };
}