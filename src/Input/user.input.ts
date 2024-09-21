import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserInput {
    @Field(() => String)
    clerkId: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    name: string;
}

@InputType()
export class GetUserInput {
    @Field(() => String)
    clerkId: string;
}

@InputType()
export class UserWishlistInput {
    @Field(() => String)
    clerkId: string;

    @Field(() => String)
    wishlistProductId: string;
}

