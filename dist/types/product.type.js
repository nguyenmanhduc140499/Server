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
exports.AllProductResponse = exports.ProductResponse = void 0;
const type_graphql_1 = require("type-graphql");
const product_1 = require("../model/product");
const response_type_1 = require("./response.type");
let ProductResponse = class ProductResponse extends response_type_1.IResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => product_1.Product, { nullable: true }),
    __metadata("design:type", product_1.Product)
], ProductResponse.prototype, "product", void 0);
ProductResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], ProductResponse);
exports.ProductResponse = ProductResponse;
let AllProductResponse = class AllProductResponse extends response_type_1.IResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [product_1.Product], { nullable: true }),
    __metadata("design:type", Array)
], AllProductResponse.prototype, "listProduct", void 0);
AllProductResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], AllProductResponse);
exports.AllProductResponse = AllProductResponse;
//# sourceMappingURL=product.type.js.map