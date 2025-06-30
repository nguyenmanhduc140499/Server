import { Service } from "typedi";
import { DeleteCollectionInput } from "../../Input/collection.input";
import { CollectionModel } from "../../model/collection";
import { ProductModel } from "../../model/product";
import { IResponse } from "../../types/response.type";

@Service()
export default class DeleteCollectionService {
    async deleteCollection(input: DeleteCollectionInput): Promise<IResponse> {
        const collection = await CollectionModel.findById({ _id: input._id });
        if (!collection) {
            return {
                code: 400,
                success: false,
                message: "Collection does not exist",
            };
        }

        await ProductModel.updateMany(
            { collections: collection._id },
            { $pull: { collections: collection._id } },
            { new: true }
        );
        await CollectionModel.deleteOne({ _id: collection._id });
        return {
            code: 200,
            success: true,
            message: "Done",
        };
    }
}