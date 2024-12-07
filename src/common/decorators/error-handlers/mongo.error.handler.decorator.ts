import { convertMongoException } from '../../libs/mongo.exceptions.converter';

export function MongoErrorHandler() {
    // return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    //     const originalMethod = descriptor.value;
    //     descriptor.value = async function (...args: any[]) {
    //         try {
    //             await originalMethod.apply(this, args);
    //         }
    //         catch (error) {
    //             convertMongoException(error);
    //         }
    //     };
    //     return descriptor;
    // };
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
                        return await originalMethod.apply(this, args);
                    }
                    catch (error) {
                        convertMongoException(error);
                    }
                }
            }
        }
    }
}