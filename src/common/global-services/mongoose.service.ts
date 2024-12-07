import { Injectable } from '@nestjs/common';
import { Document, Model } from 'mongoose';
import { MongoErrorHandler } from '../decorators/error-handlers/mongo.error.handler.decorator';

@Injectable()
@MongoErrorHandler()
export abstract class MongooseService<T extends Document> {
    protected constructor (
        protected readonly model: Model<T>,
    ) {}


    async create(data: any) {
        const createdEntity = new this.model(data);
        return await createdEntity.save();
    }

    async getById(id: string) {
        return await this.model.findOne({
            _id: id,
            deleted: false,
        }).exec();
    }

    async getAll() {
        return await this.model.find({
            deleted: false,
        }).exec();
    }

    async update(id: string, data: any) {
        return await this.model.findOneAndUpdate({
            _id: id,
            deleted: false,
        }, {
            $set: data,
        }, {
            new: true,
        }).exec();
    }

    async delete(id: string) {
        return await this.model.findOneAndUpdate({
            _id: id,
        }, {
            $set: {
                deleted: true,
            }
        }, {
            new: true,
        }).exec();
    }
}