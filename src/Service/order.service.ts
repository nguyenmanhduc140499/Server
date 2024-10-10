import { OrderStatus } from "./../model/order";
import {
    ActiveOrder,
    CreateOrderInput,
    DetailsOrderInput,
} from "../Input/order.input";
import {
    AllOrderResponse,
    OrderByCustomer,
    OrderResponse,
} from "../types/order.type";
import { Order, OrderModel } from "../model/order";
import { ProductModel } from "../model/product";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { IResponse } from "../types/response.type";

export class OrderService {
    async createOrder(input: CreateOrderInput): Promise<OrderResponse> {
        try {
            const productDetails = await Promise.all(
                input.products.map(async item => {
                    const product = await ProductModel.findById(item.productId);
                    return {
                        product,
                        color: item.color,
                        size: item.size,
                        quantity: item.quantity,
                    };
                })
            );
            const orderInfo: any = {
                customerClerkId: input.customerClerkId,
                totalAmount: input.totalAmount,
                customerName: input.customerName,
                address: input.address,
                phone: input.phone,
                products: productDetails,
            };
            if (input.email) {
                orderInfo.email = input.email;
            }
            if (input.status) {
                if (input.status !== OrderStatus.PENDING) {
                    return {
                        code: 400,
                        success: false,
                        message: "Order status is invalid",
                    };
                }
                orderInfo.status = input.status;
            }
            if (input._id) {
                orderInfo._id = input._id;
            }
            const newOrder = await OrderModel.create(orderInfo);
            return {
                code: 200,
                success: true,
                order: newOrder,
            };
        } catch (error) {
            return {
                code: 400,
                success: false,
                message: error.message,
            };
        }
    }

    async findAllOrder(): Promise<AllOrderResponse> {
        try {
            const allOrder = await OrderModel.find(
                { status: { $exists: false } },
                { _id: 1, customerName: 1, products: 1, totalAmount: 1, createdAt: 1 }
            )
                .sort({ createdAt: -1 })
                .exec();
            const data = allOrder.map((item: Order) => {
                const utcDate = toZonedTime(
                    JSON.parse(JSON.stringify(item.createdAt)),
                    "UTC"
                );
                const formatDate = format(utcDate, "MMM do, yyyy");
                return {
                    _id: item._id.toString(),
                    customer: item.customerName,
                    products: item.products.length,
                    totalAmount: item.totalAmount,
                    createdAt: formatDate,
                };
            });
            return {
                code: 200,
                success: true,
                listOrder: data,
            };
        } catch (error) {
            return {
                code: 400,
                success: false,
                message: error.message,
            };
        }
    }

    async getOrderDetails(input: DetailsOrderInput): Promise<OrderResponse> {
        try {
            const orderData = await OrderModel.findById({
                _id: input.orderId,
            }).populate("products.product");
            return {
                code: 200,
                success: true,
                order: orderData,
            };
        } catch (error) {
            return {
                code: 400,
                success: false,
                message: error.message,
            };
        }
    }

    async getOrderByCustomer(customerClerkId: string): Promise<OrderByCustomer> {
        try {
            const allOrderByCustomer = await OrderModel.find({
                customerClerkId,
                status: { $exists: false },
            })
                .sort({ createdAt: -1 })
                .populate("products.product");
            return {
                code: 200,
                success: true,
                listOrder: allOrderByCustomer,
            };
        } catch (error) {
            return {
                code: 400,
                success: false,
                message: error.message,
            };
        }
    }

    async activeOrder(input: ActiveOrder): Promise<IResponse> {
        try {
            const isExistsOrder = await OrderModel.findById(input.orderId);
            if (!isExistsOrder) {
                return {
                    code: 400,
                    success: false,
                    message: "Order is not exists",
                };
            }
            await OrderModel.updateOne(
                { _id: isExistsOrder._id },
                { $unset: { status: "" } },
                { new: true }
            );
            return {
                code: 200,
                success: true
            }
        } catch (error) {
            return {
                code: 500,
                success: false,
                message: error.message,
            };
        }
    }
}
