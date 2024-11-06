import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    versionKey: false,
})
export class User extends Document {

    @Prop({
        type: String,
        required: true,
        unique: true,
        trim: true,
    })
    name: string;

    @Prop({
        type: String,
        required: true,
    })
    password: string;

    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    email: string;
    @Prop({
        type: Boolean,
        default: false,
    })
    deleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);