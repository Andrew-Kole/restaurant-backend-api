import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../common/mongo-schemas/user/user.schema';
import { Model } from 'mongoose';
import { LoginDto } from '../auth/dto/login.dto';
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

    async findByEmail(loginDto: LoginDto) {
       const user = await this.userModel.findOne({
            email: loginDto.email,
            password: loginDto.password,
            deleted: false,
        }).exec();
       console.log(user);
       return user;
    }
}