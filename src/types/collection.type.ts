import { Field, ObjectType } from "type-graphql";
import { Collection } from "../model/collection";
import { IResponse } from "./response.type";

@ObjectType()
export class CollectionResponse extends IResponse {
    @Field(() => Collection, { nullable: true })
    collection?: Collection;
}
@ObjectType()
export class AllCollectionResponse extends IResponse {
    @Field(() => [Collection], { nullable: true })
    listCollection?: Collection[];
}
@ObjectType()
export class CollectionTitleResponse extends IResponse {
    @Field(() => String, { nullable: true })
    title?: string;
}