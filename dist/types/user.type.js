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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllUserResponse = exports.UserResponse = void 0;
const type_graphql_1 = require("type-graphql");
const user_1 = require("../model/user");
const response_type_1 = require("./response.type");
let UserResponse = class UserResponse extends response_type_1.IResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => user_1.User, { nullable: true }),
    __metadata("design:type", user_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
exports.UserResponse = UserResponse;
let AllUserResponse = class AllUserResponse extends response_type_1.IResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [user_1.User], { nullable: true }),
    __metadata("design:type", Array)
], AllUserResponse.prototype, "listUser", void 0);
AllUserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], AllUserResponse);
exports.AllUserResponse = AllUserResponse;
//# sourceMappingURL=user.type.js.map