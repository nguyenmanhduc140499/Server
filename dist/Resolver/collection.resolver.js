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
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const collection_1 = require("../model/collection");
const collection_service_1 = require("../Service/collection.service");
const collection_input_1 = require("../Input/collection.input");
const collection_type_1 = require("../types/collection.type");
const response_type_1 = require("../types/response.type");
let CollectionResolver = class CollectionResolver {
    constructor(collectionService) {
        this.collectionService = collectionService;
        this.collectionService = new collection_service_1.CollectionService();
    }
    createCollection(input) {
        return this.collectionService.createCollection(input);
    }
    deleteCollection(input) {
        return this.collectionService.deleteCollection(input);
    }
    updateCollection(input) {
        return this.collectionService.updateCollection(input);
    }
    getListCollection() {
        return this.collectionService.findAllCollection();
    }
    getCollection(input) {
        return this.collectionService.findSingleCollection(input);
    }
    getCollectionTitle(_id) {
        return this.collectionService.titleCollection(_id);
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => collection_1.Collection),
    __param(0, (0, type_graphql_1.Arg)("CreateCollectionInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [collection_input_1.CreateCollectionInput]),
    __metadata("design:returntype", void 0)
], CollectionResolver.prototype, "createCollection", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => response_type_1.IResponse),
    __param(0, (0, type_graphql_1.Arg)("DeleteCollectionInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [collection_input_1.DeleteCollectionInput]),
    __metadata("design:returntype", void 0)
], CollectionResolver.prototype, "deleteCollection", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => collection_type_1.CollectionResponse),
    __param(0, (0, type_graphql_1.Arg)("UpdateCollectionInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [collection_input_1.UpdateCollectionInput]),
    __metadata("design:returntype", Promise)
], CollectionResolver.prototype, "updateCollection", null);
__decorate([
    (0, type_graphql_1.Query)(() => collection_type_1.AllCollectionResponse, { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CollectionResolver.prototype, "getListCollection", null);
__decorate([
    (0, type_graphql_1.Query)(() => collection_type_1.CollectionResponse, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("GetCollectionInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [collection_input_1.GetCollectionInput]),
    __metadata("design:returntype", Promise)
], CollectionResolver.prototype, "getCollection", null);
__decorate([
    (0, type_graphql_1.Query)(() => String, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CollectionResolver.prototype, "getCollectionTitle", null);
CollectionResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [collection_service_1.CollectionService])
], CollectionResolver);
exports.default = CollectionResolver;
//# sourceMappingURL=collection.resolver.js.map