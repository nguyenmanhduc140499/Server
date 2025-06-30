"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_tz_1 = require("date-fns-tz");
const date_fns_1 = require("date-fns");
const typedi_1 = require("typedi");
const order_1 = require("../../model/order");
let GetOrderService = class GetOrderService {
    async findAllOrder() {
        try {
            const allOrder = await order_1.OrderModel.find({ status: { $exists: false } }, { _id: 1, customerName: 1, products: 1, totalAmount: 1, createdAt: 1 })
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
            const orderData = await order_1.OrderModel.findById({
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
            const allOrderByCustomer = await order_1.OrderModel.find({
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
};
GetOrderService = __decorate([
    (0, typedi_1.Service)()
], GetOrderService);
exports.default = GetOrderService;
//# sourceMappingURL=getOrder.service.js.map