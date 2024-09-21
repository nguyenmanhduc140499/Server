import { ObjectType, Field } from "type-graphql";
import { User } from "../model/user";
import { IResponse } from "./response.type";

@ObjectType()
export class UserResponse extends IResponse {
    @Field(() => User, { nullable: true })
    user?: User;
}

@ObjectType()
export class AllUserResponse extends IResponse {
    @Field(() => [User], { nullable: true })
    listUser?: User[];
}