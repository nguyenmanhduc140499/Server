import { Mutation, Arg, Resolver, Query } from "type-graphql";
import { CreateUserInput, GetUserInput, UserWishlistInput } from "../Input/user.input";
import { AllUserResponse, UserResponse } from "../types/user.type";
import { Inject, Service } from "typedi";
import CreateUserService from "../Service/userServices/createUser.service";
import GetUserService from "../Service/userServices/getUserDetail.service";
import UserWishlistService from "../Service/userServices/userWishlist.service";

@Service()
@Resolver()
export default class UserResolver {
    constructor(
        private readonly createUserService: CreateUserService,
        private readonly getUserService: GetUserService,
        private readonly userWishlistService: UserWishlistService
    ) { }

    @Mutation(() => UserResponse)
    createUser(
        @Arg("createUserInput") input: CreateUserInput
    ): Promise<UserResponse> {
        return this.createUserService.createUser(input);
    }

    @Mutation(() => UserResponse)
    userWishlist(
        @Arg("userWishlistInput") input: UserWishlistInput
    ): Promise<UserResponse> {
        return this.userWishlistService.userWishlistProcess(input);
    }

    @Query(() => UserResponse)
    getUserDetail(@Arg("getUserInput") input: GetUserInput): Promise<UserResponse> {
        return this.getUserService.getUserDetail(input);
    }

    @Query(() => AllUserResponse)
    getListUser(): Promise<AllUserResponse> {
        return this.getUserService.getListUser();
    }
}