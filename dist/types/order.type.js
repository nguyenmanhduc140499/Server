"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderByCustomer = exports.AllOrderResponse = exports.ListOrderData = exports.OrderResponse = void 0;
const type_graphql_1 = require("type-graphql");
const order_1 = require("../model/order");
const response_type_1 = require("./response.type");
let OrderResponse = class OrderResponse extends response_type_1.IResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => order_1.Order, { nullable: true }),
    __metadata("design:type", order_1.Order)
], OrderResponse.prototype, "order", void 0);
OrderResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], OrderResponse);
exports.OrderResponse = OrderResponse;
let ListOrderData = class ListOrderData {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ListOrderData.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ListOrderData.prototype, "customer", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], ListOrderData.prototype, "products", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], ListOrderData.prototype, "totalAmount", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ListOrderData.prototype, "createdAt", void 0);
ListOrderData = __decorate([
    (0, type_graphql_1.ObjectType)()
], ListOrderData);
exports.ListOrderData = ListOrderData;
let AllOrderResponse = class AllOrderResponse extends response_type_1.IResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [ListOrderData], { nullable: true }),
    __metadata("design:type", Array)
], AllOrderResponse.prototype, "listOrder", void 0);
AllOrderResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], AllOrderResponse);
exports.AllOrderResponse = AllOrderResponse;
let OrderByCustomer = class OrderByCustomer extends response_type_1.IResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [order_1.Order], { nullable: true }),
    __metadata("design:type", Array)
], OrderByCustomer.prototype, "listOrder", void 0);
OrderByCustomer = __decorate([
    (0, type_graphql_1.ObjectType)()
], OrderByCustomer);
exports.OrderByCustomer = OrderByCustomer;
//# sourceMappingURL=order.type.js.map