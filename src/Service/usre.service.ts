import mongoose from "mongoose";
import {
    CreateUserInput,
    GetUserInput,
    UserWishlistInput,
} from "../Input/user.input";
import { ProductModel } from "../model/product";
import { UserModel } from "../model/user";
import { AllUserResponse, UserResponse } from "../types/user.type";

export class UserService {
    async createUser(input: CreateUserInput): Promise<UserResponse> {
        try {
            const existedUser = await UserModel.findOne({ clerkId: input.clerkId });
            if (existedUser) {
                return {
                    code: 200,
                    success: true,
                    user: existedUser,
                };
            }
            const condition: any = {
                clerkId: input.clerkId,
                email: input.email,
                name: input.name
            }
            const newUser = await UserModel.create(condition);
            return {
                code: 200,
                success: true,
                user: newUser,
            };
        } catch (error) {
            return {
                code: 400,
                success: false,
                message: error.message,
            };
        }
    }

    async userWishlistProcess(input: UserWishlistInput): Promise<UserResponse> {
        const existedUser = await UserModel.findOne({ clerkId: input.clerkId });
        if (!existedUser) {
            return {
                code: 400,
                success: false,
                message: "User does not exists",
            };
        }
        if (
            !(await ProductModel.findById(
                { _id: new mongoose.Types.ObjectId(input.wishlistProductId) },
                { _id: 1 }
            ))
        ) {
            return {
                code: 400,
                success: false,
                message: "Product dose not exists",
            };
        }

        const isWishlist = existedUser.wishlist.includes(input.wishlistProductId);
        if (isWishlist) {
            //Dislike
            existedUser.wishlist = existedUser.wishlist.filter(
                (item: string) => item !== input.wishlistProductId
            );
        } else {
            //Like
            existedUser.wishlist.push(input.wishlistProductId);
        }

        const updateWishlistUser = await existedUser.save();
        return {
            code: 200,
            success: true,
            user: updateWishlistUser,
        };
    }

    async getUserDetail(input: GetUserInput): Promise<UserResponse> {
        try {
            const userDetail = await UserModel.findOne({ clerkId: input.clerkId });
            if (!userDetail) {
                return {
                    code: 400,
                    success: false,
                    message: "User not found",
                };
            }
            return {
                code: 200,
                success: true,
                user: userDetail,
            };
        } catch (error) {
            return {
                code: 400,
                success: false,
                message: error.message,
            };
        }
    }

    async getListUser(): Promise<AllUserResponse> {
        try {
            const allUser = await UserModel.find().sort({ name: -1 })
            if (!allUser) {
                return {
                    code: 400,
                    success: false,
                    message: "List user is empty"
                };
            }
            return {
                code: 200,
                success: true,
                listUser: allUser,
            };
        } catch (error) {
            return {
                code: 400,
                success: false,
                message: error.message
            };
        }
    }
}
