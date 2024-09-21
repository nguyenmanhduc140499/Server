import { Mutation, Arg, Resolver, Query } from "type-graphql";
import { CreateUserInput, GetUserInput, UserWishlistInput } from "../Input/user.input";
import { UserService } from "../Service/usre.service";
import { AllUserResponse, UserResponse } from "../types/user.type";

@Resolver()
export default class UserResolver {
    constructor(private readonly userService: UserService) {
        this.userService = new UserService();
    }

    @Mutation(() => UserResponse)
    createUser(
        @Arg("createUserInput") input: CreateUserInput
    ): Promise<UserResponse> {
        return this.userService.createUser(input);
    }

    @Mutation(() => UserResponse)
    userWishlist(
        @Arg("userWishlistInput") input: UserWishlistInput
    ): Promise<UserResponse> {
        return this.userService.userWishlistProcess(input);
    }

    @Query(() => UserResponse)
    getUserDetail(@Arg("getUserInput") input: GetUserInput): Promise<UserResponse> {
        return this.userService.getUserDetail(input);
    }

    @Query(() => AllUserResponse)
    getListUser(): Promise<AllUserResponse> {
        return this.userService.getListUser();
    }
}