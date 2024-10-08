import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCollectionInput {
    @Field(() => String)
    title: string;

    @Field(() => String)
    banner: string;

    @Field(() => String)
    image: string

    @Field(() => String, { nullable: true })
    description?: string
}

@InputType()
export class UpdateCollectionInput extends CreateCollectionInput {
    @Field(() => String, { nullable: true })
    _id?: String;
}

@InputType()
export class GetCollectionInput {
    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => String, { nullable: true })
    _id?: String;
}

@InputType()
export class DeleteCollectionInput {
    @Field(() => String)
    _id: String;
}

@InputType()
export class UpdateProductCollectionInput extends DeleteCollectionInput {
    @Field(() => String)
    productId: String;

    @Field(() => String)
    status: String;
}