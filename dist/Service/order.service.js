"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const order_1 = require("./../model/order");
const order_2 = require("../model/order");
const product_1 = require("../model/product");
const date_fns_1 = require("date-fns");
const date_fns_tz_1 = require("date-fns-tz");
class OrderService {
    async createOrder(input) {
        try {
            const productDetails = await Promise.all(input.products.map(async (item) => {
                const product = await product_1.ProductModel.findById(item.productId);
                return {
                    product,
                    color: item.color,
                    size: item.size,
                    quantity: item.quantity,
                };
            }));
            const orderInfo = {
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
                if (input.status !== order_1.OrderStatus.PENDING) {
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
            const newOrder = await order_2.OrderModel.create(orderInfo);
            return {
                code: 200,
                success: true,
                order: newOrder,
            };
        }
        catch (error) {
            return {
                code: 400,
                success: false,
                message: error.message,
            };
        }
    }
    async findAllOrder() {
        try {
            const allOrder = await order_2.OrderModel.find({ status: { $exists: false } }, { _id: 1, customerName: 1, products: 1, totalAmount: 1, createdAt: 1 })
                .sort({ createdAt: -1 })
                .exec();
            const data = allOrder.map((item) => {
                const utcDate = (0, date_fns_tz_1.toZonedTime)(JSON.parse(JSON.stringify(item.createdAt)), "UTC");
                const formatDate = (0, date_fns_1.format)(utcDate, "MMM do, yyyy");
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
        }
        catch (error) {
            return {
                code: 400,
                success: false,
                message: error.message,
            };
        }
    }
    async getOrderDetails(input) {
        try {
            const orderData = await order_2.OrderModel.findById({
                _id: input.orderId,
            }).populate("products.product");
            return {
                code: 200,
                success: true,
                order: orderData,
            };
        }
        catch (error) {
            return {
                code: 400,
                success: false,
                message: error.message,
            };
        }
    }
    async getOrderByCustomer(customerClerkId) {
        try {
            const allOrderByCustomer = await order_2.OrderModel.find({
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
        }
        catch (error) {
            return {
                code: 400,
                success: false,
                message: error.message,
            };
        }
    }
    async activeOrder(input) {
        try {
            const isExistsOrder = await order_2.OrderModel.findById(input.orderId);
            if (!isExistsOrder) {
                return {
                    code: 400,
                    success: false,
                    message: "Order is not exists",
                };
            }
            await order_2.OrderModel.updateOne({ _id: isExistsOrder._id }, { $unset: { status: "" } }, { new: true });
            return {
                code: 200,
                success: true
            };
        }
        catch (error) {
            return {
                code: 500,
                success: false,
                message: error.message,
            };
        }
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map