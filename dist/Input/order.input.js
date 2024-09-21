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
exports.DetailsOrderInput = exports.CreateOrderInput = void 0;
const type_graphql_1 = require("type-graphql");
let OrderItemTypeInput = class OrderItemTypeInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], OrderItemTypeInput.prototype, "productId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], OrderItemTypeInput.prototype, "color", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], OrderItemTypeInput.prototype, "size", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], OrderItemTypeInput.prototype, "quantity", void 0);
OrderItemTypeInput = __decorate([
    (0, type_graphql_1.InputType)()
], OrderItemTypeInput);
let CreateOrderInput = class CreateOrderInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "customerClerkId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "customerName", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "address", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "phone", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], CreateOrderInput.prototype, "totalAmount", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [OrderItemTypeInput]),
    __metadata("design:type", Array)
], CreateOrderInput.prototype, "products", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "email", void 0);
CreateOrderInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateOrderInput);
exports.CreateOrderInput = CreateOrderInput;
let DetailsOrderInput = class DetailsOrderInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], DetailsOrderInput.prototype, "orderId", void 0);
DetailsOrderInput = __decorate([
    (0, type_graphql_1.InputType)()
], DetailsOrderInput);
exports.DetailsOrderInput = DetailsOrderInput;
//# sourceMappingURL=order.input.js.map