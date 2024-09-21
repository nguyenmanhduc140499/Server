import { ObjectType, Field } from "type-graphql";
import { Order } from "../model/order";
import { IResponse } from "./response.type";

@ObjectType()
export class OrderResponse extends IResponse {
    @Field(() => Order, { nullable: true })
    order?: Order;
}
@ObjectType()
export class ListOrderData {
    @Field(() => String)
    _id: string

    @Field(() => String)
    customer: string

    @Field(() => Number)
    products: number

    @Field(() => Number)
    totalAmount: number

    @Field(() => String)
    createdAt: string
}

@ObjectType()
export class AllOrderResponse extends IResponse {
    @Field(() => [ListOrderData], { nullable: true })
    listOrder?: ListOrderData[];
}

@ObjectType()
export class OrderByCustomer extends IResponse {
    @Field(() => [Order], { nullable: true })
    listOrder?: Order[];
}