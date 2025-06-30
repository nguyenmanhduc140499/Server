import { Mutation, Arg, Resolver, Query } from "type-graphql";
import {
    AllOrderResponse,
    OrderByCustomer,
    OrderResponse,
} from "../types/order.type";
import {
    ActiveOrder,
    CreateOrderInput,
    DetailsOrderInput,
} from "../Input/order.input";
import { IResponse } from "../types/response.type";
import { Service } from "typedi";
import CreateOrderService from "../Service/orderServices/createOrder.service";
import GetOrderService from "../Service/orderServices/getOrder.service";
import ActiveOrderService from "../Service/orderServices/activeOrder.service";
@Service()
@Resolver()
export default class OrderResolver {
    constructor(
        private readonly createOrderService: CreateOrderService,
        private readonly getOrderService: GetOrderService,
        private readonly activeOrderService: ActiveOrderService
    ) { }

    @Mutation(() => OrderResponse)
    createOrder(
        @Arg("createOrderInput") input: CreateOrderInput
    ): Promise<OrderResponse> {
        return this.createOrderService.createOrder(input);
    }

    @Mutation(() => IResponse)
    activeOrder(@Arg("activeOrder") input: ActiveOrder): Promise<IResponse> {
        return this.activeOrderService.activeOrder(input);
    }

    @Query(() => AllOrderResponse, { nullable: true })
    getListOrder(): Promise<AllOrderResponse> {
        return this.getOrderService.findAllOrder();
    }

    @Query(() => OrderByCustomer, { nullable: true })
    getOrderByCustomer(
        @Arg("customerClerkId") customerClerkId: string
    ): Promise<OrderByCustomer> {
        return this.getOrderService.getOrderByCustomer(customerClerkId);
    }

    @Query(() => OrderResponse)
    getOrderDetails(
        @Arg("detailsOrderInput") input: DetailsOrderInput
    ): Promise<OrderResponse> {
        return this.getOrderService.getOrderDetails(input);
    }
}
