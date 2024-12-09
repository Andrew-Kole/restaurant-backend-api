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
        const savedEntity = await createdEntity.save();
        return savedEntity.toObject();
    }

    async getById(id: string) {
        const document = await this.model.findOne({
            _id: id,
            deleted: false,
        }).exec();
        return document ? document.toObject() : null;
    }

    async getAll() {
        const documents = await this.model.find({
            deleted: false,
        }).exec();
        return documents.map(document => document.toObject());
    }

    async update(id: string, data: any) {
        const document = await this.model.findOneAndUpdate({
            _id: id,
            deleted: false,
        }, {
            $set: data,
        }, {
            new: true,
        }).exec();
        return document ? document.toObject() : null;
    }

    async delete(id: string) {
        const document = await this.model.findOneAndUpdate({
            _id: id,
        }, {
            $set: {
                deleted: true,
            }
        }, {
            new: true,
        }).exec();
        return document ? document.toObject() : null;
    }
}