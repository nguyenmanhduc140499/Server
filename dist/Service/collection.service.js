"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionService = void 0;
const collection_1 = require("../model/collection");
const product_1 = require("../model/product");
class CollectionService {
    async createCollection(input) {
        if (!input.title || !input.image) {
            return {
                code: 400,
                success: false,
                message: "Title and image must be required",
            };
        }
        return await collection_1.CollectionModel.create(input);
    }
    async findAllCollection() {
        const allCollection = await collection_1.CollectionModel.find().populate("products");
        if (!allCollection) {
            return {
                code: 400,
                success: false,
            };
        }
        return {
            code: 200,
            success: true,
            listCollection: allCollection,
        };
    }
    async titleCollection(_id) {
        const collection = await collection_1.CollectionModel.findById(_id, { title: 1 });
        return collection.title;
    }
    async findSingleCollection(input) {
        const condition = {};
        if (input._id) {
            condition._id = input._id;
        }
        if (input.title) {
            condition.title = input.title;
        }
        try {
            const existedCollection = await collection_1.CollectionModel.findOne(condition).populate("products");
            if (!existedCollection) {
                return {
                    code: 400,
                    success: false,
                    message: "collection does not exist",
                };
            }
            return {
                code: 200,
                success: true,
                collection: existedCollection,
            };
        }
        catch (error) {
            return {
                code: 400,
                success: false,
                message: error.message,
            };
        }
    }
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
        }, { new: true }).populate('products');
        return {
            code: 200,
            success: true,
            collection: updateCollection,
        };
    }
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
}
exports.CollectionService = CollectionService;
//# sourceMappingURL=collection.service.js.map