"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const typedi_1 = require("typedi");
const collection_1 = require("../../model/collection");
const product_1 = require("../../model/product");
let UpdateProductService = class UpdateProductService {
    async updateProduct(input) {
        const existTitle = await product_1.ProductModel.findOne({ title: input.title }, { title: 1 });
        if (existTitle && existTitle._id.toString() !== input._id) {
            return {
                code: 400,
                success: false,
                message: "Duplicate title"
            };
        }
        const existProduct = await product_1.ProductModel.findById({ _id: input._id });
        if (!existProduct) {
            return {
                code: 400,
                success: false,
                message: "Product does not exists"
            };
        }
        const { _id } = input, restInput = __rest(input, ["_id"]);
        const updateProduct = await product_1.ProductModel.findByIdAndUpdate({ _id: input._id }, restInput, { new: true });
        //remove product in collections
        if (existProduct.collections.length) {
            await collection_1.CollectionModel.updateMany({ products: updateProduct._id }, { $pull: { products: updateProduct._id } }, { new: true });
        }
        //update product with new collections
        if (restInput.collections.length) {
            await collection_1.CollectionModel.updateMany({
                _id: {
                    $in: restInput.collections.map(item => new mongoose_1.default.Types.ObjectId(item)),
                },
            }, { $push: { products: updateProduct } }, { new: true });
        }
        return {
            code: 200,
            success: true,
            product: updateProduct
        };
    }
};
UpdateProductService = __decorate([
    (0, typedi_1.Service)()
], UpdateProductService);
exports.default = UpdateProductService;
//# sourceMappingURL=updateProduct.service.js.map