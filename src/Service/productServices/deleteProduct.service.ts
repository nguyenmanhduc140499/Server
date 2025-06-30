import { Service } from "typedi";
import { DeleteProductInput } from "../../Input/productInput";
import { ProductModel, ProductStatus } from "../../model/product";
import { IResponse } from "../../types/response.type";

@Service()
export default class DeleteProductService {
    async deleteProduct(input: DeleteProductInput): Promise<IResponse> {
        try {
            const product = await ProductModel.findById({ _id: input._id });
            if (!product) {
                return {
                    code: 400,
                    success: false,
                    message: "Collection does not exist",
                };
            }

            //discontinued product
            await ProductModel.updateOne({ _id: product._id }, { status: ProductStatus.DISCONTINUED }, { new: true })
            return {
                code: 200,
                success: true,
                message: "Done",
            };
        } catch (error) {
            return {
                code: 400,
                success: false,
                message: error.message
            }
        }
    }
}