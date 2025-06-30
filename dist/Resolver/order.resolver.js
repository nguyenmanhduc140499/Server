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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const order_type_1 = require("../types/order.type");
const order_input_1 = require("../Input/order.input");
const response_type_1 = require("../types/response.type");
const typedi_1 = require("typedi");
const createOrder_service_1 = __importDefault(require("../Service/orderServices/createOrder.service"));
const getOrder_service_1 = __importDefault(require("../Service/orderServices/getOrder.service"));
const activeOrder_service_1 = __importDefault(require("../Service/orderServices/activeOrder.service"));
let OrderResolver = class OrderResolver {
    constructor(createOrderService, getOrderService, activeOrderService) {
        this.createOrderService = createOrderService;
        this.getOrderService = getOrderService;
        this.activeOrderService = activeOrderService;
    }
    createOrder(input) {
        return this.createOrderService.createOrder(input);
    }
    activeOrder(input) {
        return this.activeOrderService.activeOrder(input);
    }
    getListOrder() {
        return this.getOrderService.findAllOrder();
    }
    getOrderByCustomer(customerClerkId) {
        return this.getOrderService.getOrderByCustomer(customerClerkId);
    }
    getOrderDetails(input) {
        return this.getOrderService.getOrderDetails(input);
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => order_type_1.OrderResponse),
    __param(0, (0, type_graphql_1.Arg)("createOrderInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_input_1.CreateOrderInput]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "createOrder", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => response_type_1.IResponse),
    __param(0, (0, type_graphql_1.Arg)("activeOrder")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_input_1.ActiveOrder]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "activeOrder", null);
__decorate([
    (0, type_graphql_1.Query)(() => order_type_1.AllOrderResponse, { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "getListOrder", null);
__decorate([
    (0, type_graphql_1.Query)(() => order_type_1.OrderByCustomer, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("customerClerkId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "getOrderByCustomer", null);
__decorate([
    (0, type_graphql_1.Query)(() => order_type_1.OrderResponse),
    __param(0, (0, type_graphql_1.Arg)("detailsOrderInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_input_1.DetailsOrderInput]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "getOrderDetails", null);
OrderResolver = __decorate([
    (0, typedi_1.Service)(),
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [createOrder_service_1.default,
        getOrder_service_1.default,
        activeOrder_service_1.default])
], OrderResolver);
exports.default = OrderResolver;
//# sourceMappingURL=order.resolver.js.map