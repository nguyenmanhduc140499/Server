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
let DeleteProductService = class DeleteProductService {
    async deleteProduct(input) {
        try {
            const product = await product_1.ProductModel.findById({ _id: input._id });
            if (!product) {
                return {
                    code: 400,
                    success: false,
                    message: "Collection does not exist",
                };
            }
            //discontinued product
            await product_1.ProductModel.updateOne({ _id: product._id }, { status: product_1.ProductStatus.DISCONTINUED }, { new: true });
            return {
                code: 200,
                success: true,
                message: "Done",
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
DeleteProductService = __decorate([
    (0, typedi_1.Service)()
], DeleteProductService);
exports.default = DeleteProductService;
//# sourceMappingURL=deleteProduct.service.js.map