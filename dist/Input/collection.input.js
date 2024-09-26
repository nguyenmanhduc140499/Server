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
exports.UpdateProductCollectionInput = exports.DeleteCollectionInput = exports.GetCollectionInput = exports.UpdateCollectionInput = exports.CreateCollectionInput = void 0;
const type_graphql_1 = require("type-graphql");
let CreateCollectionInput = class CreateCollectionInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateCollectionInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateCollectionInput.prototype, "banner", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateCollectionInput.prototype, "image", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreateCollectionInput.prototype, "description", void 0);
CreateCollectionInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateCollectionInput);
exports.CreateCollectionInput = CreateCollectionInput;
let UpdateCollectionInput = class UpdateCollectionInput extends CreateCollectionInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateCollectionInput.prototype, "_id", void 0);
UpdateCollectionInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateCollectionInput);
exports.UpdateCollectionInput = UpdateCollectionInput;
let GetCollectionInput = class GetCollectionInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], GetCollectionInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], GetCollectionInput.prototype, "_id", void 0);
GetCollectionInput = __decorate([
    (0, type_graphql_1.InputType)()
], GetCollectionInput);
exports.GetCollectionInput = GetCollectionInput;
let DeleteCollectionInput = class DeleteCollectionInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], DeleteCollectionInput.prototype, "_id", void 0);
DeleteCollectionInput = __decorate([
    (0, type_graphql_1.InputType)()
], DeleteCollectionInput);
exports.DeleteCollectionInput = DeleteCollectionInput;
let UpdateProductCollectionInput = class UpdateProductCollectionInput extends DeleteCollectionInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UpdateProductCollectionInput.prototype, "productId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UpdateProductCollectionInput.prototype, "status", void 0);
UpdateProductCollectionInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateProductCollectionInput);
exports.UpdateProductCollectionInput = UpdateProductCollectionInput;
//# sourceMappingURL=collection.input.js.map