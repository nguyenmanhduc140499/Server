import { Service } from "typedi";
import { DeleteCollectionInput, GetCollectionInput } from "../../Input/collection.input";
import { CollectionModel } from "../../model/collection";
import { AllCollectionResponse, CollectionTitleResponse, CollectionResponse } from "../../types/collection.type";

@Service()
export default class GetCollectionService {
    async findAllCollection(): Promise<AllCollectionResponse> {
        const allCollection = await CollectionModel.find().populate("products");
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

    async titleCollection(input: DeleteCollectionInput): Promise<CollectionTitleResponse> {
        try {
            const collection = await CollectionModel.findById({ _id: input._id }, { title: 1 });
            return {
                code: 200,
                success: true,
                title: collection.title
            };
        } catch (error) {
            return {
                code: 400,
                success: false,
                message: "Collection does not exists"
            }
        }
    }

    async findSingleCollection(
        input: GetCollectionInput
    ): Promise<CollectionResponse> {
        const condition: any = {};
        if (input._id) {
            condition._id = input._id;
        }
        if (input.title) {
            condition.title = input.title;
        }
        try {
            const existedCollection = await CollectionModel.findOne(
                condition
            ).populate("products");
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
        } catch (error) {
            return {
                code: 400,
                success: false,
                message: error.message,
            };
        }
    }
}