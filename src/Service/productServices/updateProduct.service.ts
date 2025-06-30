import mongoose from "mongoose";
import { Service } from "typedi";
import { UpdateProductInput } from "../../Input/productInput";
import { CollectionModel } from "../../model/collection";
import { ProductModel, Product } from "../../model/product";
import { ProductResponse } from "../../types/product.type";

@Service()
export default class UpdateProductService {
    async updateProduct(input: UpdateProductInput): Promise<ProductResponse> {
        const existTitle = await ProductModel.findOne({ title: input.title }, { title: 1 })
        if (existTitle && existTitle._id.toString() !== input._id) {
            return {
                code: 400,
                success: false,
                message: "Duplicate title"
            }
        }
        const existProduct = await ProductModel.findById({ _id: input._id })
        if (!existProduct) {
            return {
                code: 400,
                success: false,
                message: "Product does not exists"
            }
        }

        const { _id, ...restInput } = input
        const updateProduct = await ProductModel.findByIdAndUpdate(
            { _id: input._id },
            restInput,
            { new: true })
        //remove product in collections
        if (existProduct.collections.length) {
            await CollectionModel.updateMany(
                { products: updateProduct._id },
                { $pull: { products: updateProduct._id } },
                { new: true }
            );
        }

        //update product with new collections
        if (restInput.collections.length) {
            await CollectionModel.updateMany(
                {
                    _id: {
                        $in: restInput.collections.map(
                            item => new mongoose.Types.ObjectId(item)
                        ),
                    },
                },
                { $push: { products: updateProduct as Product } },
                { new: true }
            );
        }

        return {
            code: 200,
            success: true,
            product: updateProduct
        }
    }
}