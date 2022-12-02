import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;


@Schema()
export class User {
    @Prop()
    name:string;

    @Prop()
    cpf:string;

    @Prop()
    balance:number;

    constructor(user?: Partial<User>){
        this.name = user.name;
        this.cpf = user.cpf;
        this.balance = user.balance;
    }
}

export const UserSchema = SchemaFactory.createForClass(User);