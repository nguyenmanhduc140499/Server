import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCollectionInput {
    @Field(() => String)
    title: string;

    @Field(() => String, { nullable: true })
    description?: string

    @Field(() => String)
    image: string
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