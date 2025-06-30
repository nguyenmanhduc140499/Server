import { Service } from "typedi";
import { GetProductInput } from "../../Input/productInput";
import { ProductModel, Product, ProductStatus } from "../../model/product";
import { AllProductResponse, ProductResponse } from "../../types/product.type";

@Service()
export default class GetProductService {
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

    async findProductByQuery(input: string): Promise<AllProductResponse> {
        try {
            const productsData = await ProductModel.find({
                $and: [
                    { status: ProductStatus.INUSE },
                    {
                        $or: [
                            { title: { $regex: input, $options: "i" } },
                            { category: { $regex: input, $options: "i" } },
                            { tags: { $in: [new RegExp(input, "i")] } }
                        ]
                    }
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
            const product = await ProductModel.findById({ _id: mainProductId, status: ProductStatus.INUSE }, { _id: 1, category: 1, collections: 1 })
            if (!product) {
                return {
                    code: 404,
                    success: false,
                    message: "Product not found"
                }
            }
            const relatedProduct = await ProductModel.find({
                _id: { $ne: product._id },
                status: ProductStatus.INUSE,
                $or: [
                    { category: product.category },
                    { collections: { $in: product.collections } }
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