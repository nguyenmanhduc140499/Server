import { ObjectId } from 'mongoose';
import { Field, ID, ObjectType } from "type-graphql";
import {
  getModelForClass,
  modelOptions,
  Prop,
} from "@typegoose/typegoose";

@ObjectType()
@modelOptions({ schemaOptions: { collection: "products", timestamps: true } })
export class Product {
  @Field(() => ID)
  _id: ObjectId;

  @Field(() => String)
  @Prop({ required: true, unique: true })
  title: string;

  @Field(() => String)
  @Prop({ required: true })
  description: string;

  @Field(() => String)
  @Prop({ required: true })
  category: string;

  @Field(() => Number)
  @Prop({ required: true })
  price: number;

  @Field(() => Number)
  @Prop({ required: true })
  expense: number;

  @Field(() => [String])
  @Prop({ type: () => [String], required: true })
  media: string[];

  @Field(() => [String], { nullable: true })
  @Prop({ type: () => [String] })
  collections?: string[];

  @Field(() => [String], { nullable: true })
  @Prop({ type: () => [String] })
  tags?: string[];

  @Field(() => [String], { nullable: true })
  @Prop({ type: () => [String] })
  sizes?: string[];

  @Field(() => [String], { nullable: true })
  @Prop({ type: () => [String] })
  colors?: string[];

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

export const ProductModel = getModelForClass<typeof Product>(Product);
