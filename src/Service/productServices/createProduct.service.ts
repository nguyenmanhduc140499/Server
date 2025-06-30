import mongoose from "mongoose";
import { Service } from "typedi";
import { CreateProductInput } from "../../Input/productInput";
import { CollectionModel } from "../../model/collection";
import { ProductModel, Product } from "../../model/product";
import { ProductResponse } from "../../types/product.type";
import { checkDuplicate } from "../../utils/common";

@Service()
export default class CreateProductService {
    async createProduct(input: CreateProductInput): Promise<ProductResponse> {
        if (
            !input.title ||
            !input.description ||
            !input.category ||
            !input.price ||
            !input.expense ||
            !input.media
        ) {
            return {
                code: 400,
                success: false,
                message: "Not enough data to create a product",
            };
        }
        const isDuplicate = checkDuplicate(input);
        if (isDuplicate.length) {
            return {
                code: 400,
                success: false,
                message: `Field ${isDuplicate.join(", ")} is duplicate`,
            };
        }

        const newProduct = await ProductModel.create(input);
        // add product to collections if product belong collections
        if (input.collections) {
            await CollectionModel.updateMany(
                {
                    _id: {
                        $in: input.collections.map(
                            item => new mongoose.Types.ObjectId(item)
                        ),
                    },
                },
                { $push: { products: newProduct as Product } },
                { new: true }
            );
        }
        return {
            code: 200,
            success: true,
            product: newProduct,
        };
    }
}