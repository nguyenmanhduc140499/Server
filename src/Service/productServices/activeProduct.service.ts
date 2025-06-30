import { Service } from "typedi";
import { ActiveProductInput } from "../../Input/productInput";
import { ProductModel, ProductStatus } from "../../model/product";
import { IResponse } from "../../types/response.type";

@Service()
export default class ActiveProductService {
    async activeProduct(input: ActiveProductInput): Promise<IResponse> {
        //Active product
        try {
            await ProductModel.findOneAndUpdate({ _id: input._id }, { status: ProductStatus.INUSE }, { new: true })
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