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
exports.OrderModel = exports.Order = exports.OrderItemType = exports.OrderStatus = void 0;
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const product_1 = require("./product");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
let OrderItemType = class OrderItemType {
};
__decorate([
    (0, type_graphql_1.Field)(() => product_1.Product),
    (0, typegoose_1.Prop)({ ref: () => product_1.Product, required: true }),
    __metadata("design:type", Object)
], OrderItemType.prototype, "product", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], OrderItemType.prototype, "color", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], OrderItemType.prototype, "size", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number),
    (0, typegoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], OrderItemType.prototype, "quantity", void 0);
OrderItemType = __decorate([
    (0, type_graphql_1.ObjectType)()
], OrderItemType);
exports.OrderItemType = OrderItemType;
let Order = class Order {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", Object)
], Order.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Order.prototype, "customerClerkId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Order.prototype, "customerName", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Order.prototype, "address", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Order.prototype, "phone", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number),
    (0, typegoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Order.prototype, "totalAmount", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [OrderItemType]),
    (0, typegoose_1.Prop)({ type: () => [OrderItemType], required: true }),
    __metadata("design:type", Array)
], Order.prototype, "products", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Order.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Object)
], Order.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Object)
], Order.prototype, "updatedAt", void 0);
Order = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: "orders", timestamps: true } })
], Order);
exports.Order = Order;
exports.OrderModel = (0, typegoose_1.getModelForClass)(Order);
//# sourceMappingURL=order.js.map