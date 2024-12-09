import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../common/mongo-schemas/user/user.schema';
import { Model } from 'mongoose';
import { MongooseService } from '../common/global-services/mongoose.service';
import { MongoErrorHandler } from '../common/decorators/error-handlers/mongo.error.handler.decorator';

@Injectable()
@MongoErrorHandler()
export class UserRepository extends MongooseService<UserDocument>{
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {
        super(userModel);
    }

    async findByEmail(email: string) {
       const user = await this.userModel.findOne({
            email: email,
            deleted: false,
        }).exec();
       return user ? user.toObject() : null;
    }
}