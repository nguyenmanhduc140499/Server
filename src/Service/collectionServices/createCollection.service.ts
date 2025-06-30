import { Service } from "typedi";
import { CreateCollectionInput } from "../../Input/collection.input";
import { CollectionModel } from "../../model/collection";
import { CollectionResponse } from "../../types/collection.type";

@Service()
export default class CreateCollectionService {
    async createCollection(input: CreateCollectionInput): Promise<CollectionResponse> {
        try {
            if (!input.title || !input.image) {
                return {
                    code: 400,
                    success: false,
                    message: "Title and image must be required",
                };
            }
            const newCollection = await CollectionModel.create(input);
            return {
                code: 200,
                success: true,
                collection: newCollection
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