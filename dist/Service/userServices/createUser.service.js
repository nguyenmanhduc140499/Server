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
let CreateUserService = class CreateUserService {
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
            const condition = {
                clerkId: input.clerkId,
                email: input.email,
                name: input.name
            };
            const newUser = await user_1.UserModel.create(condition);
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
};
CreateUserService = __decorate([
    (0, typedi_1.Service)()
], CreateUserService);
exports.default = CreateUserService;
//# sourceMappingURL=createUser.service.js.map