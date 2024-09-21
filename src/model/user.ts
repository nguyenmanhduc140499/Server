import { Field, ID, ObjectType } from "type-graphql";
import {
    getModelForClass,
    modelOptions,
    Prop,
} from "@typegoose/typegoose";
import { Date, ObjectId } from "mongoose";

@ObjectType()
@modelOptions({ schemaOptions: { collection: "users", timestamps: true } })
export class User {
    @Field(() => ID)
    _id: ObjectId

    @Field(() => String)
    @Prop({ required: true, unique: true })
    clerkId: string

    @Field(() => String)
    @Prop({ required: true })
    email: string

    @Field(() => String)
    @Prop({ required: true })
    name: string

    @Field(() => [String], { nullable: true })
    @Prop({ type: () => [String] })
    wishlist?: string[]

    @Field(() => Date, { nullable: true })
    createdAt?: Date;

    @Field(() => Date, { nullable: true })
    updatedAt?: Date;
}

export const UserModel = getModelForClass<typeof User>(User);
