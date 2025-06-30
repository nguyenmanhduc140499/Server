import { toZonedTime } from "date-fns-tz";
import { format } from "date-fns";
import { Service } from "typedi";
import { DetailsOrderInput } from "../../Input/order.input";
import { OrderModel, Order } from "../../model/order";
import { AllOrderResponse, OrderResponse, OrderByCustomer } from "../../types/order.type";

@Service()
export default class GetOrderService {
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
}