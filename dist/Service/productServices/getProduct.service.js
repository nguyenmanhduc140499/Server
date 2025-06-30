"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const product_1 = require("../../model/product");
let GetProductService = class GetProductService {
    async findAllProduct() {
        const allProduct = await product_1.ProductModel.find()
            .lean()
            .sort({ createdAt: -1 })
            .exec();
        if (!allProduct) {
            return {
                code: 400,
                success: false,
            };
        }
        return {
            code: 200,
            success: true,
            listProduct: allProduct,
        };
    }
    async getProductDetail(input) {
        try {
            const productDetails = await product_1.ProductModel.findById(input.productId);
            return {
                code: 200,
                success: true,
                product: productDetails,
            };
        }
        catch (error) {
            return {
                code: 400,
                success: false,
                message: error.message
            };
        }
    }
    async findProductByQuery(input) {
        try {
            const productsData = await product_1.ProductModel.find({
                $and: [
                    { status: product_1.ProductStatus.INUSE },
                    {
                        $or: [
                            { title: { $regex: input, $options: "i" } },
                            { category: { $regex: input, $options: "i" } },
                            { tags: { $in: [new RegExp(input, "i")] } }
                        ]
                    }
                ]
            });
            return {
                code: 200,
                success: true,
                listProduct: productsData
            };
        }
        catch (error) {
            return {
                code: 400,
                success: false,
                message: error.message
            };
        }
    }
    async getRelatedProduct(mainProductId) {
        try {
            const product = await product_1.ProductModel.findById({ _id: mainProductId, status: product_1.ProductStatus.INUSE }, { _id: 1, category: 1, collections: 1 });
            if (!product) {
                return {
                    code: 404,
                    success: false,
                    message: "Product not found"
                };
            }
            const relatedProduct = await product_1.ProductModel.find({
                _id: { $ne: product._id },
                status: product_1.ProductStatus.INUSE,
                $or: [
                    { category: product.category },
                    { collections: { $in: product.collections } }
                ]
            });
            if (!relatedProduct || !relatedProduct.length) {
                return {
                    code: 404,
                    success: false,
                    message: "Related products not found"
                };
            }
            return {
                code: 200,
                success: true,
                listProduct: relatedProduct
            };
        }
        catch (error) {
            return {
                code: 400,
                success: false,
                message: error.message
            };
        }
    }
};
GetProductService = __decorate([
    (0, typedi_1.Service)()
], GetProductService);
exports.default = GetProductService;
//# sourceMappingURL=getProduct.service.js.map