import { CollectionModel } from "./../model/collection";
import {
  CreateProductInput,
  DeleteProductInput,
  GetProductInput,
  UpdateProductInput,
} from "../Input/productInput";
import { Product, ProductModel } from "../model/product";
import { AllProductResponse, ProductResponse } from "../types/product.type";
import { checkDuplicate } from "../utils/common";
import mongoose from "mongoose";
import { IResponse } from "../types/response.type";

export class ProductService {
  // constructor(private readonly collectionService: CollectionService) { }

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

  async findAllProduct(): Promise<AllProductResponse> {
    const allProduct = await ProductModel.find()
      .lean<Product[]>()
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

  async getProductDetail(input: GetProductInput): Promise<ProductResponse> {
    try {
      const productDetails = await ProductModel.findById(input.productId);
      return {
        code: 200,
        success: true,
        product: productDetails,
      };
    } catch (error) {
      return {
        code: 400,
        success: false,
        message: error.message
      };
    }
  }

  async deleteProduct(input: DeleteProductInput): Promise<IResponse> {
    const product = await ProductModel.findById({ _id: input._id });
    if (!product) {
      return {
        code: 400,
        success: false,
        message: "Collection does not exist",
      };
    }
    if (product.collections.length) {
      await CollectionModel.updateMany(
        { products: product._id },
        { $pull: { products: product._id } },
        { new: true }
      );
    }

    await ProductModel.deleteOne({ _id: product._id });
    return {
      code: 200,
      success: true,
      message: "Done",
    };
  }

  async findProductByQuery(input: string): Promise<AllProductResponse> {
    try {
      const productsData = await ProductModel.find({
        $or: [
          { title: { $regex: input, $options: "i" } },
          { category: { $regex: input, $options: "i" } },
          { tags: { $in: [new RegExp(input, "i")] } }
        ]
      })
      return {
        code: 200,
        success: true,
        listProduct: productsData
      }
    } catch (error) {
      return {
        code: 400,
        success: false,
        message: error.message
      }
    }
  }

  async getRelatedProduct(mainProductId: string): Promise<AllProductResponse> {
    try {
      const product = await ProductModel.findById({ _id: mainProductId }, { _id: 1, category: 1, collections: 1 })
      if (!product) {
        return {
          code: 404,
          success: false,
          message: "Product not found"
        }
      }
      const relatedProduct = await ProductModel.find({
        _id: { $ne: product._id },
        $or: [
          { category: product.category },
          { collections: product.collections }
        ]
      })

      if (!relatedProduct || !relatedProduct.length) {
        return {
          code: 404,
          success: false,
          message: "Related products not found"
        }
      }

      return {
        code: 200,
        success: true,
        listProduct: relatedProduct
      }
    } catch (error) {
      return {
        code: 400,
        success: false,
        message: error.message
      }
    }
  }
}
