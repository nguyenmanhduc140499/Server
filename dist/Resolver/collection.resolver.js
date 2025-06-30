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
const collection_input_1 = require("../Input/collection.input");
const collection_type_1 = require("../types/collection.type");
const response_type_1 = require("../types/response.type");
const typedi_1 = require("typedi");
const createCollection_service_1 = __importDefault(require("../Service/collectionServices/createCollection.service"));
const deleteCollection_service_1 = __importDefault(require("../Service/collectionServices/deleteCollection.service"));
const getCollection_service_1 = __importDefault(require("../Service/collectionServices/getCollection.service"));
const updateCollection_service_1 = __importDefault(require("../Service/collectionServices/updateCollection.service"));
let CollectionResolver = class CollectionResolver {
    constructor(createCollectionService, updateCollectionService, getCollectionService, deleteCollectionService) {
        this.createCollectionService = createCollectionService;
        this.updateCollectionService = updateCollectionService;
        this.getCollectionService = getCollectionService;
        this.deleteCollectionService = deleteCollectionService;
    }
    createCollection(input) {
        return this.createCollectionService.createCollection(input);
    }
    deleteCollection(input) {
        return this.deleteCollectionService.deleteCollection(input);
    }
    updateCollection(input) {
        return this.updateCollectionService.updateCollection(input);
    }
    updateProductCollection(input) {
        return this.updateCollectionService.updateProductCollection(input);
    }
    getListCollection() {
        return this.getCollectionService.findAllCollection();
    }
    getCollection(input) {
        return this.getCollectionService.findSingleCollection(input);
    }
    getCollectionTitle(input) {
        return this.getCollectionService.titleCollection(input);
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => collection_type_1.CollectionResponse),
    __param(0, (0, type_graphql_1.Arg)("CreateCollectionInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [collection_input_1.CreateCollectionInput]),
    __metadata("design:returntype", Promise)
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
    (0, type_graphql_1.Mutation)(() => collection_type_1.CollectionResponse),
    __param(0, (0, type_graphql_1.Arg)("UpdateProductCollectionInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [collection_input_1.UpdateProductCollectionInput]),
    __metadata("design:returntype", Promise)
], CollectionResolver.prototype, "updateProductCollection", null);
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
    (0, type_graphql_1.Query)(() => collection_type_1.CollectionTitleResponse),
    __param(0, (0, type_graphql_1.Arg)("DeleteCollectionInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [collection_input_1.DeleteCollectionInput]),
    __metadata("design:returntype", Promise)
], CollectionResolver.prototype, "getCollectionTitle", null);
CollectionResolver = __decorate([
    (0, typedi_1.Service)(),
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [createCollection_service_1.default,
        updateCollection_service_1.default,
        getCollection_service_1.default,
        deleteCollection_service_1.default])
], CollectionResolver);
exports.default = CollectionResolver;
//# sourceMappingURL=collection.resolver.js.map