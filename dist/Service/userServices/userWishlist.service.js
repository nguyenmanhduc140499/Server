"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const user_1 = require("../../model/user");
const product_1 = require("../../model/product");
const mongoose_1 = __importDefault(require("mongoose"));
let UserWishlistService = class UserWishlistService {
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
};
UserWishlistService = __decorate([
    (0, typedi_1.Service)()
], UserWishlistService);
exports.default = UserWishlistService;
//# sourceMappingURL=userWishlist.service.js.map