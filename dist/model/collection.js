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
exports.CollectionModel = exports.Collection = void 0;
const product_1 = require("./product");
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
let Collection = class Collection {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", Object)
], Collection.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Collection.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.Prop)(),
    __metadata("design:type", String)
], Collection.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Collection.prototype, "image", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [product_1.Product], { nullable: true, defaultValue: [] }),
    (0, typegoose_1.Prop)({ ref: () => product_1.Product }),
    __metadata("design:type", Array)
], Collection.prototype, "products", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Object)
], Collection.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Object)
], Collection.prototype, "updatedAt", void 0);
Collection = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: "collection", timestamps: true } })
], Collection);
exports.Collection = Collection;
exports.CollectionModel = (0, typegoose_1.getModelForClass)(Collection);
//# sourceMappingURL=collection.js.map