import { Service } from "typedi";
import { CreateOrderInput } from "../../Input/order.input";
import { OrderStatus, OrderModel } from "../../model/order";
import { ProductModel } from "../../model/product";
import { OrderResponse } from "../../types/order.type";

@Service()
export default class CreateOrderService {
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
}