import { Service } from "typedi";
import { UserWishlistInput } from "../../Input/user.input";
import { UserResponse } from "../../types/user.type";
import { UserModel } from "../../model/user";
import { ProductModel } from "../../model/product";
import mongoose from "mongoose";

@Service()
export default class UserWishlistService {
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
}
