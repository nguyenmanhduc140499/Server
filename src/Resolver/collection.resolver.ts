import { Mutation, Arg, Resolver, Query } from "type-graphql";
import {
    CreateCollectionInput,
    DeleteCollectionInput,
    GetCollectionInput,
    UpdateCollectionInput,
    UpdateProductCollectionInput,
} from "../Input/collection.input";
import {
    AllCollectionResponse,
    CollectionResponse,
    CollectionTitleResponse,
} from "../types/collection.type";
import { IResponse } from "../types/response.type";
import { Service } from "typedi";
import CreateCollectionService from "../Service/collectionServices/createCollection.service";
import DeleteCollectionService from "../Service/collectionServices/deleteCollection.service";
import GetCollectionService from "../Service/collectionServices/getCollection.service";
import UpdateCollectionService from "../Service/collectionServices/updateCollection.service";
@Service()
@Resolver()
export default class CollectionResolver {
    constructor(
        private readonly createCollectionService: CreateCollectionService,
        private readonly updateCollectionService: UpdateCollectionService,
        private readonly getCollectionService: GetCollectionService,
        private readonly deleteCollectionService: DeleteCollectionService
    ) { }

    @Mutation(() => CollectionResponse)
    createCollection(
        @Arg("CreateCollectionInput") input: CreateCollectionInput
    ): Promise<CollectionResponse> {
        return this.createCollectionService.createCollection(input);
    }

    @Mutation(() => IResponse)
    deleteCollection(@Arg("DeleteCollectionInput") input: DeleteCollectionInput) {
        return this.deleteCollectionService.deleteCollection(input);
    }

    @Mutation(() => CollectionResponse)
    updateCollection(
        @Arg("UpdateCollectionInput") input: UpdateCollectionInput
    ): Promise<CollectionResponse> {
        return this.updateCollectionService.updateCollection(input);
    }

    @Mutation(() => CollectionResponse)
    updateProductCollection(
        @Arg("UpdateProductCollectionInput") input: UpdateProductCollectionInput
    ): Promise<CollectionResponse> {
        return this.updateCollectionService.updateProductCollection(input);
    }

    @Query(() => AllCollectionResponse, { nullable: true })
    getListCollection(): Promise<AllCollectionResponse> {
        return this.getCollectionService.findAllCollection();
    }

    @Query(() => CollectionResponse, { nullable: true })
    getCollection(
        @Arg("GetCollectionInput") input: GetCollectionInput
    ): Promise<CollectionResponse> {
        return this.getCollectionService.findSingleCollection(input);
    }

    @Query(() => CollectionTitleResponse)
    getCollectionTitle(
        @Arg("DeleteCollectionInput") input: DeleteCollectionInput
    ): Promise<CollectionTitleResponse> {
        return this.getCollectionService.titleCollection(input);
    }
}
