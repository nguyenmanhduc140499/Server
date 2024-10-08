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
exports.ProductModel = exports.Product = exports.ProductStatus = void 0;
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
var ProductStatus;
(function (ProductStatus) {
    ProductStatus["DISCONTINUED"] = "DISCONTINUED";
    ProductStatus["INUSE"] = "INUSE";
})(ProductStatus = exports.ProductStatus || (exports.ProductStatus = {}));
let Product = class Product {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", Object)
], Product.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number),
    (0, typegoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Number),
    (0, typegoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "expense", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String]),
    (0, typegoose_1.Prop)({ type: () => [String], required: true }),
    __metadata("design:type", Array)
], Product.prototype, "media", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typegoose_1.Prop)({ type: () => [String] }),
    __metadata("design:type", Array)
], Product.prototype, "collections", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typegoose_1.Prop)({ type: () => [String] }),
    __metadata("design:type", Array)
], Product.prototype, "tags", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typegoose_1.Prop)({ type: () => [String] }),
    __metadata("design:type", Array)
], Product.prototype, "sizes", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typegoose_1.Prop)({ type: () => [String] }),
    __metadata("design:type", Array)
], Product.prototype, "colors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)({ default: ProductStatus.INUSE }),
    __metadata("design:type", String)
], Product.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
Product = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: "products", timestamps: true } })
], Product);
exports.Product = Product;
exports.ProductModel = (0, typegoose_1.getModelForClass)(Product);
//# sourceMappingURL=product.js.map