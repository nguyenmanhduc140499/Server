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
let ActiveOrderService = class ActiveOrderService {
    async activeOrder(input) {
        try {
            const isExistsOrder = await order_1.OrderModel.findById(input.orderId);
            if (!isExistsOrder) {
                return {
                    code: 400,
                    success: false,
                    message: "Order is not exists",
                };
            }
            await order_1.OrderModel.updateOne({ _id: isExistsOrder._id }, { $unset: { status: "" } }, { new: true });
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
};
ActiveOrderService = __decorate([
    (0, typedi_1.Service)()
], ActiveOrderService);
exports.default = ActiveOrderService;
//# sourceMappingURL=activeOrder.service.js.map