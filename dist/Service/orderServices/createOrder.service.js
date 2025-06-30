"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const order_1 = require("../../model/order");
const product_1 = require("../../model/product");
let CreateOrderService = class CreateOrderService {
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
            const newOrder = await order_1.OrderModel.create(orderInfo);
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
};
CreateOrderService = __decorate([
    (0, typedi_1.Service)()
], CreateOrderService);
exports.default = CreateOrderService;
//# sourceMappingURL=createOrder.service.js.map