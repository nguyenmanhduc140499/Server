"use strict";
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
exports.ProductService = void 0;
const collection_1 = require("./../model/collection");
const product_1 = require("../model/product");
const common_1 = require("../utils/common");
const mongoose_1 = __importDefault(require("mongoose"));
class ProductService {
    // constructor(private readonly collectionService: CollectionService) { }
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
    async activeProduct(input) {
        //Active product
        try {
            await product_1.ProductModel.findOneAndUpdate({ _id: input._id }, { status: product_1.ProductStatus.INUSE }, { new: true });
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
                    { collections: product.collections }
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
}
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map