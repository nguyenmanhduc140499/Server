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
exports.CollectionTitleResponse = exports.AllCollectionResponse = exports.CollectionResponse = void 0;
const type_graphql_1 = require("type-graphql");
const collection_1 = require("../model/collection");
const response_type_1 = require("./response.type");
let CollectionResponse = class CollectionResponse extends response_type_1.IResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => collection_1.Collection, { nullable: true }),
    __metadata("design:type", collection_1.Collection)
], CollectionResponse.prototype, "collection", void 0);
CollectionResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], CollectionResponse);
exports.CollectionResponse = CollectionResponse;
let AllCollectionResponse = class AllCollectionResponse extends response_type_1.IResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [collection_1.Collection], { nullable: true }),
    __metadata("design:type", Array)
], AllCollectionResponse.prototype, "listCollection", void 0);
AllCollectionResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], AllCollectionResponse);
exports.AllCollectionResponse = AllCollectionResponse;
let CollectionTitleResponse = class CollectionTitleResponse extends response_type_1.IResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], CollectionTitleResponse.prototype, "title", void 0);
CollectionTitleResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], CollectionTitleResponse);
exports.CollectionTitleResponse = CollectionTitleResponse;
//# sourceMappingURL=collection.type.js.map