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
const productInput_1 = require("../Input/productInput");
const product_type_1 = require("../types/product.type");
const response_type_1 = require("../types/response.type");
const activeProduct_service_1 = __importDefault(require("../Service/productServices/activeProduct.service"));
const createProduct_service_1 = __importDefault(require("../Service/productServices/createProduct.service"));
const deleteProduct_service_1 = __importDefault(require("../Service/productServices/deleteProduct.service"));
const getProduct_service_1 = __importDefault(require("../Service/productServices/getProduct.service"));
const updateProduct_service_1 = __importDefault(require("../Service/productServices/updateProduct.service"));
const typedi_1 = require("typedi");
let ProductResolver = class ProductResolver {
    constructor(createProductService, updateProductService, getProductService, deleteProductService, activeProductService) {
        this.createProductService = createProductService;
        this.updateProductService = updateProductService;
        this.getProductService = getProductService;
        this.deleteProductService = deleteProductService;
        this.activeProductService = activeProductService;
    }
    createProduct(input) {
        return this.createProductService.createProduct(input);
    }
    updateProduct(input) {
        return this.updateProductService.updateProduct(input);
    }
    deleteProduct(input) {
        return this.deleteProductService.deleteProduct(input);
    }
    activeProduct(input) {
        return this.activeProductService.activeProduct(input);
    }
    getListProduct() {
        return this.getProductService.findAllProduct();
    }
    getProductDetail(input) {
        return this.getProductService.getProductDetail(input);
    }
    searchProduct(query) {
        return this.getProductService.findProductByQuery(query);
    }
    getRelatedProduct(mainProductId) {
        return this.getProductService.getRelatedProduct(mainProductId);
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => product_type_1.ProductResponse),
    __param(0, (0, type_graphql_1.Arg)("createProductInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [productInput_1.CreateProductInput]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "createProduct", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => product_type_1.ProductResponse),
    __param(0, (0, type_graphql_1.Arg)("UpdateProductInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [productInput_1.UpdateProductInput]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "updateProduct", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => response_type_1.IResponse),
    __param(0, (0, type_graphql_1.Arg)("DeleteProductInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [productInput_1.DeleteProductInput]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "deleteProduct", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => response_type_1.IResponse),
    __param(0, (0, type_graphql_1.Arg)("ActiveProductInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [productInput_1.ActiveProductInput]),
    __metadata("design:returntype", void 0)
], ProductResolver.prototype, "activeProduct", null);
__decorate([
    (0, type_graphql_1.Query)(() => product_type_1.AllProductResponse, { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getListProduct", null);
__decorate([
    (0, type_graphql_1.Query)(() => product_type_1.ProductResponse),
    __param(0, (0, type_graphql_1.Arg)("getProductInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [productInput_1.GetProductInput]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getProductDetail", null);
__decorate([
    (0, type_graphql_1.Query)(() => product_type_1.AllProductResponse, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("productQuery")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "searchProduct", null);
__decorate([
    (0, type_graphql_1.Query)(() => product_type_1.AllProductResponse, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("mainProductId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getRelatedProduct", null);
ProductResolver = __decorate([
    (0, typedi_1.Service)(),
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [createProduct_service_1.default,
        updateProduct_service_1.default,
        getProduct_service_1.default,
        deleteProduct_service_1.default,
        activeProduct_service_1.default])
], ProductResolver);
exports.default = ProductResolver;
//# sourceMappingURL=product.resolver.js.map