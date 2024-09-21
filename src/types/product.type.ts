import { ObjectType, Field } from "type-graphql";
import { Product } from "../model/product";
import { IResponse } from "./response.type";

@ObjectType()
export class ProductResponse extends IResponse {
    @Field(() => Product, { nullable: true })
    product?: Product;
}

@ObjectType()
export class AllProductResponse extends IResponse {
    @Field(() => [Product], { nullable: true })
    listProduct?: Product[];
}