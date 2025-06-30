"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const typedi_1 = require("typedi");
const collection_1 = require("../../model/collection");
const product_1 = require("../../model/product");
const common_1 = require("../../utils/common");
let CreateProductService = class CreateProductService {
    async createProduct(input) {
        if (!input.title ||
            !input.description ||
            !input.category ||
            !input.price ||
            !input.expense ||
            !input.media) {
            return {
                code: 400,
                success: false,
                message: "Not enough data to create a product",
            };
        }
        const isDuplicate = (0, common_1.checkDuplicate)(input);
        if (isDuplicate.length) {
            return {
                code: 400,
                success: false,
                message: `Field ${isDuplicate.join(", ")} is duplicate`,
            };
        }
        const newProduct = await product_1.ProductModel.create(input);
        // add product to collections if product belong collections
        if (input.collections) {
            await collection_1.CollectionModel.updateMany({
                _id: {
                    $in: input.collections.map(item => new mongoose_1.default.Types.ObjectId(item)),
                },
            }, { $push: { products: newProduct } }, { new: true });
        }
        return {
            code: 200,
            success: true,
            product: newProduct,
        };
    }
};
CreateProductService = __decorate([
    (0, typedi_1.Service)()
], CreateProductService);
exports.default = CreateProductService;
//# sourceMappingURL=createProduct.service.js.map