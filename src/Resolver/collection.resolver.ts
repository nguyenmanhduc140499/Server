import { Mutation, Arg, Ctx, Resolver, Query } from "type-graphql";
import { Collection } from "../model/collection";
import { CollectionService } from "../Service/collection.service";
import { CreateCollectionInput, DeleteCollectionInput, GetCollectionInput, UpdateCollectionInput, UpdateProductCollectionInput } from "../Input/collection.input";
import { AllCollectionResponse, CollectionResponse, CollectionTitleResponse } from "../types/collection.type";
import { IResponse } from "../types/response.type";

@Resolver()
export default class CollectionResolver {
    constructor(private readonly collectionService: CollectionService) {
        this.collectionService = new CollectionService();
    }

    @Mutation(() => CollectionResponse)
    createCollection(
        @Arg("CreateCollectionInput") input: CreateCollectionInput,
    ): Promise<CollectionResponse> {
        return this.collectionService.createCollection(input);
    }

    @Mutation(() => IResponse)
    deleteCollection(
        @Arg("DeleteCollectionInput") input: DeleteCollectionInput,
    ) {
        return this.collectionService.deleteCollection(input);
    }

    @Mutation(() => CollectionResponse)
    updateCollection(
        @Arg("UpdateCollectionInput") input: UpdateCollectionInput,
    ): Promise<CollectionResponse> {
        return this.collectionService.updateCollection(input);
    }

    @Mutation(() => CollectionResponse)
    updateProductCollection(
        @Arg("UpdateProductCollectionInput") input: UpdateProductCollectionInput,
    ): Promise<CollectionResponse> {
        return this.collectionService.updateProductCollection(input);
    }

    @Query(() => AllCollectionResponse, { nullable: true })
    getListCollection(): Promise<AllCollectionResponse> {
        return this.collectionService.findAllCollection()
    }

    @Query(() => CollectionResponse, { nullable: true })
    getCollection(@Arg("GetCollectionInput") input: GetCollectionInput): Promise<CollectionResponse> {
        return this.collectionService.findSingleCollection(input);
    }

    @Query(() => CollectionTitleResponse)
    getCollectionTitle(@Arg("DeleteCollectionInput") input: DeleteCollectionInput): Promise<CollectionTitleResponse> {
        return this.collectionService.titleCollection(input);
    }
}