import { Service } from "typedi";
import { UpdateCollectionInput, UpdateProductCollectionInput } from "../../Input/collection.input";
import { CollectionModel } from "../../model/collection";
import { CollectionResponse, UpdateProductFlagEnum } from "../../types/collection.type";

@Service()
export default class UpdateCollectionService {
    async updateCollection(
        input: UpdateCollectionInput
    ): Promise<CollectionResponse> {
        const existCollection = await CollectionModel.findOne({
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

        const updateCollection = await CollectionModel.findByIdAndUpdate(
            { _id: input._id },
            {
                title: input.title,
                description: input.description,
                image: input.image,
                banner: input.banner
            },
            { new: true }
        ).populate("products");

        return {
            code: 200,
            success: true,
            collection: updateCollection,
        };
    }
    async updateProductCollection(
        input: UpdateProductCollectionInput
    ): Promise<CollectionResponse> {
        try {
            const existCollection = await CollectionModel.findById(input._id);
            if (!existCollection) {
                return {
                    code: 400,
                    success: false,
                    message: "Collection do not exists",
                };
            }

            let condition: any = {};
            const status: string[] = [
                UpdateProductFlagEnum.ADD,
                UpdateProductFlagEnum.REMOVE,
            ];
            if (!status.includes(input.status as string)) {
                return {
                    code: 400,
                    success: false,
                    message: "Action update is invalid",
                };
            }

            const isProductExist = existCollection.products.filter(
                item =>
                    JSON.parse(JSON.stringify(item._id)) === (input.productId as string)
            );
            if (!isProductExist.length) {
                return {
                    code: 400,
                    success: false,
                    message: "Product is invalid",
                };
            }

            if (input.status === UpdateProductFlagEnum.ADD) {
                condition = { $push: { products: input.productId } };
            } else {
                condition = { $pull: { products: input.productId } };
            }

            const collectionUpdated = await CollectionModel.findByIdAndUpdate(
                { _id: input._id },
                condition,
                { new: true }
            ).populate("products");
            return {
                code: 200,
                success: true,
                collection: collectionUpdated,
            };
        } catch (error) {
            return {
                code: 500,
                success: false,
                message: error.message,
            };
        }
    }

}