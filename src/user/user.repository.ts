import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../common/mongo-schemas/user/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.create.dto';
import { UserUpdateDto } from './dto/user.update.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async create(user: CreateUserDto) {
        const newUser = new this.userModel(user);
        await newUser.save();
        return newUser;
    }

    async update(userId: string, user: UserUpdateDto) {
        return this.userModel.findOneAndUpdate({
            _id: userId,
            deleted: false,
        },{
            $set: user,
        }, {
            new: true,
        }).exec();
    }

    async getById(userId: string) {
        console.log(userId)
        return this.userModel.findOne({
            _id: userId,
            deleted: false,
        }).exec();
    }

    async getAll() {
        return this.userModel.find({
            deleted: false,
        }).exec();
    }

    async delete(userId: string) {
        return this.userModel.findOneAndUpdate({
            _id: userId,
        }, {
            $set: {
                deleted: true,
            }
        }, {
            new: true,
        });
    }
}