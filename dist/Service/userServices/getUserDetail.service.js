"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const user_1 = require("../../model/user");
let GetUserService = class GetUserService {
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
};
GetUserService = __decorate([
    (0, typedi_1.Service)()
], GetUserService);
exports.default = GetUserService;
//# sourceMappingURL=getUserDetail.service.js.map