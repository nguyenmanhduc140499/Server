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
const product_1 = require("../../model/product");
let DeleteCollectionService = class DeleteCollectionService {
    async deleteCollection(input) {
        const collection = await collection_1.CollectionModel.findById({ _id: input._id });
        if (!collection) {
            return {
                code: 400,
                success: false,
                message: "Collection does not exist",
            };
        }
        await product_1.ProductModel.updateMany({ collections: collection._id }, { $pull: { collections: collection._id } }, { new: true });
        await collection_1.CollectionModel.deleteOne({ _id: collection._id });
        return {
            code: 200,
            success: true,
            message: "Done",
        };
    }
};
DeleteCollectionService = __decorate([
    (0, typedi_1.Service)()
], DeleteCollectionService);
exports.default = DeleteCollectionService;
//# sourceMappingURL=deleteCollection.service.js.map