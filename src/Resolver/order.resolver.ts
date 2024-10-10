import { Mutation, Arg, Resolver, Query } from "type-graphql";
import { AllOrderResponse, OrderByCustomer, OrderResponse } from "../types/order.type";
import { ActiveOrder, CreateOrderInput, DetailsOrderInput } from "../Input/order.input";
import { OrderService } from "../Service/order.service";
import { IResponse } from "../types/response.type";

@Resolver()
export default class OrderResolver {
    constructor(private readonly orderService: OrderService) {
        this.orderService = new OrderService();
    }

    @Mutation(() => OrderResponse)
    createOrder(
        @Arg("createOrderInput") input: CreateOrderInput
    ): Promise<OrderResponse> {
        return this.orderService.createOrder(input);
    }

    @Mutation(() => IResponse)
    activeOrder(
        @Arg("activeOrder") input: ActiveOrder
    ): Promise<IResponse> {
        return this.orderService.activeOrder(input);
    }

    @Query(() => AllOrderResponse, { nullable: true })
    getListOrder(): Promise<AllOrderResponse> {
        return this.orderService.findAllOrder();
    }

    @Query(() => OrderByCustomer, { nullable: true })
    getOrderByCustomer(@Arg("customerClerkId") customerClerkId: string): Promise<OrderByCustomer> {
        return this.orderService.getOrderByCustomer(customerClerkId);
    }

    @Query(() => OrderResponse)
    getOrderDetails(
        @Arg("detailsOrderInput") input: DetailsOrderInput
    ): Promise<OrderResponse> {
        return this.orderService.getOrderDetails(input);
    }
}
