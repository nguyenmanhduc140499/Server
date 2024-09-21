"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_1 = require("../model/product");
const user_1 = require("../model/user");
class UserService {
    async createUser(input) {
        try {
            const existedUser = await user_1.UserModel.findOne({ clerkId: input.clerkId });
            if (existedUser) {
                return {
                    code: 200,
                    success: true,
                    user: existedUser,
                };
            }
            const newUser = await user_1.UserModel.create(input);
            return {
                code: 200,
                success: true,
                user: newUser,
            };
        }
        catch (error) {
            return {
                code: 400,
                success: false,
                message: error.message,
            };
        }
    }
    async userWishlistProcess(input) {
        const existedUser = await user_1.UserModel.findOne({ clerkId: input.clerkId });
        if (!existedUser) {
            return {
                code: 400,
                success: false,
                message: "User does not exists",
            };
        }
        if (!(await product_1.ProductModel.findById({ _id: new mongoose_1.default.Types.ObjectId(input.wishlistProductId) }, { _id: 1 }))) {
            return {
                code: 400,
                success: false,
                message: "Product dose not exists",
            };
        }
        const isWishlist = existedUser.wishlist.includes(input.wishlistProductId);
        if (isWishlist) {
            //Dislike
            existedUser.wishlist = existedUser.wishlist.filter((item) => item !== input.wishlistProductId);
        }
        else {
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
    async getUserDetail(input) {
        try {
            const userDetail = await user_1.UserModel.findOne({ clerkId: input.clerkId });
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
        }
        catch (error) {
            return {
                code: 400,
                success: false,
                message: error.message,
            };
        }
    }
    async getListUser() {
        try {
            const allUser = await user_1.UserModel.find().sort({ name: -1 });
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
        }
        catch (error) {
            return {
                code: 400,
                success: false,
                message: error.message
            };
        }
    }
}
exports.UserService = UserService;
//# sourceMappingURL=usre.service.js.map