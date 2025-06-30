"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const user_input_1 = require("../Input/user.input");
const user_type_1 = require("../types/user.type");
const typedi_1 = require("typedi");
const createUser_service_1 = __importDefault(require("../Service/userServices/createUser.service"));
const getUserDetail_service_1 = __importDefault(require("../Service/userServices/getUserDetail.service"));
const userWishlist_service_1 = __importDefault(require("../Service/userServices/userWishlist.service"));
let UserResolver = class UserResolver {
    constructor(createUserService, getUserService, userWishlistService) {
        this.createUserService = createUserService;
        this.getUserService = getUserService;
        this.userWishlistService = userWishlistService;
    }
    createUser(input) {
        return this.createUserService.createUser(input);
    }
    userWishlist(input) {
        return this.userWishlistService.userWishlistProcess(input);
    }
    getUserDetail(input) {
        return this.getUserService.getUserDetail(input);
    }
    getListUser() {
        return this.getUserService.getListUser();
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => user_type_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("createUserInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_type_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("userWishlistInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.UserWishlistInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userWishlist", null);
__decorate([
    (0, type_graphql_1.Query)(() => user_type_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("getUserInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.GetUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserDetail", null);
__decorate([
    (0, type_graphql_1.Query)(() => user_type_1.AllUserResponse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getListUser", null);
UserResolver = __decorate([
    (0, typedi_1.Service)(),
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [createUser_service_1.default,
        getUserDetail_service_1.default,
        userWishlist_service_1.default])
], UserResolver);
exports.default = UserResolver;
//# sourceMappingURL=user.resolver.js.map