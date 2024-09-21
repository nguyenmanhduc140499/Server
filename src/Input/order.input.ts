import { InputType, Field } from "type-graphql";

@InputType()
class OrderItemTypeInput {
    @Field(() => String)
    productId: string;

    @Field(() => String)
    color: string;

    @Field(() => String)
    size: string;

    @Field(() => Number)
    quantity: number;
}

@InputType()
export class CreateOrderInput {
    @Field(() => String)
    customerClerkId: string;

    @Field(() => String)
    customerName: string;

    @Field(() => String)
    address: string;

    @Field(() => String)
    phone: string;

    @Field(() => Number)
    totalAmount: number;

    @Field(() => [OrderItemTypeInput])
    products: OrderItemTypeInput[];

    @Field(() => String, { nullable: true })
    email?: string;
}

@InputType()
export class DetailsOrderInput {
    @Field(() => String)
    orderId: string;
}
