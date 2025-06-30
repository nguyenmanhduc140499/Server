"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const collection_1 = require("../../model/collection");
const collection_type_1 = require("../../types/collection.type");
let UpdateCollectionService = class UpdateCollectionService {
    async updateCollection(input) {
        const existCollection = await collection_1.CollectionModel.findOne({
            _id: { $ne: input._id },
            title: input.title,
        });
        if (existCollection) {
            return {
                code: 400,
                success: false,
                message: "Collection already exists",
            };
        }
        const updateCollection = await collection_1.CollectionModel.findByIdAndUpdate({ _id: input._id }, {
            title: input.title,
            description: input.description,
            image: input.image,
            banner: input.banner
        }, { new: true }).populate("products");
        return {
            code: 200,
            success: true,
            collection: updateCollection,
        };
    }
    async updateProductCollection(input) {
        try {
            const existCollection = await collection_1.CollectionModel.findById(input._id);
            if (!existCollection) {
                return {
                    code: 400,
                    success: false,
                    message: "Collection do not exists",
                };
            }
            let condition = {};
            const status = [
                collection_type_1.UpdateProductFlagEnum.ADD,
                collection_type_1.UpdateProductFlagEnum.REMOVE,
            ];
            if (!status.includes(input.status)) {
                return {
                    code: 400,
                    success: false,
                    message: "Action update is invalid",
                };
            }
            const isProductExist = existCollection.products.filter(item => JSON.parse(JSON.stringify(item._id)) === input.productId);
            if (!isProductExist.length) {
                return {
                    code: 400,
                    success: false,
                    message: "Product is invalid",
                };
            }
            if (input.status === collection_type_1.UpdateProductFlagEnum.ADD) {
                condition = { $push: { products: input.productId } };
            }
            else {
                condition = { $pull: { products: input.productId } };
            }
            const collectionUpdated = await collection_1.CollectionModel.findByIdAndUpdate({ _id: input._id }, condition, { new: true }).populate("products");
            return {
                code: 200,
                success: true,
                collection: collectionUpdated,
            };
        }
        catch (error) {
            return {
                code: 500,
                success: false,
                message: error.message,
            };
        }
    }
};
UpdateCollectionService = __decorate([
    (0, typedi_1.Service)()
], UpdateCollectionService);
exports.default = UpdateCollectionService;
//# sourceMappingURL=updateCollection.service.js.map