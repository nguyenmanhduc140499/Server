import { Product } from './product';
import { Field, ID, ObjectType } from "type-graphql";
import {
    getModelForClass,
    modelOptions,
    Prop,
    Ref,
} from "@typegoose/typegoose";
import { Date, ObjectId } from "mongoose";

@ObjectType()
@modelOptions({ schemaOptions: { collection: "collection", timestamps: true } })
export class Collection {
    @Field(() => ID)
    _id: ObjectId

    @Field(() => String)
    @Prop({ required: true, unique: true })
    title: string;

    @Field(() => String, { nullable: true })
    @Prop()
    description?: string;

    @Field(() => String)
    @Prop({ required: true })
    image: string;

    @Field(() => [Product], { nullable: true, defaultValue: [] })
    @Prop({ ref: () => Product })
    products?: Ref<Product>[];

    @Field(() => Date, { nullable: true })
    createdAt?: Date;

    @Field(() => Date, { nullable: true })
    updatedAt?: Date;
}

export const CollectionModel = getModelForClass<typeof Collection>(Collection);
