import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
    getModelForClass,
    modelOptions,
    Prop,
    Ref,
} from "@typegoose/typegoose";
import { Date, ObjectId } from "mongoose";
import { Product } from "./product";

export enum OrderStatus {
    PENDING = "PENDING",
}

@ObjectType()
export class OrderItemType {
    @Field(() => Product)
    @Prop({ ref: () => Product, required: true })
    product: Ref<Product>;

    @Field(() => String)
    @Prop({ required: true })
    color: string;

    @Field(() => String)
    @Prop({ required: true })
    size: string;

    @Field(() => Number)
    @Prop({ required: true })
    quantity: number;
}

@ObjectType()
@modelOptions({ schemaOptions: { collection: "orders", timestamps: true } })
export class Order {
    @Field(() => ID)
    _id: ObjectId

    @Field(() => String)
    @Prop({ required: true })
    customerClerkId: string

    @Field(() => String)
    @Prop({ required: true })
    customerName: string

    @Field(() => String)
    @Prop({ required: true })
    address: string

    @Field(() => String)
    @Prop({ required: true })
    phone: string

    @Field(() => Number)
    @Prop({ required: true })
    totalAmount: number

    @Field(() => [OrderItemType])
    @Prop({ type: () => [OrderItemType], required: true })
    products: OrderItemType[]

    @Field(() => String, { nullable: true })
    @Prop()
    email?: string

    @Field(() => String, { nullable: true })
    @Prop()
    status?: string

    @Field(() => Date, { nullable: true })
    createdAt?: Date;

    @Field(() => Date, { nullable: true })
    updatedAt?: Date;
}

export const OrderModel = getModelForClass<typeof Order>(Order);
