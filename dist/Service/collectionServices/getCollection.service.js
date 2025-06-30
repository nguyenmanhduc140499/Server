"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const collection_1 = require("../../model/collection");
let GetCollectionService = class GetCollectionService {
    async findAllCollection() {
        const allCollection = await collection_1.CollectionModel.find().populate("products");
        if (!allCollection) {
            return {
                code: 400,
                success: false,
            };
        }
        return {
            code: 200,
            success: true,
            listCollection: allCollection,
        };
    }
    async titleCollection(input) {
        try {
            const collection = await collection_1.CollectionModel.findById({ _id: input._id }, { title: 1 });
            return {
                code: 200,
                success: true,
                title: collection.title
            };
        }
        catch (error) {
            return {
                code: 400,
                success: false,
                message: "Collection does not exists"
            };
        }
    }
    async findSingleCollection(input) {
        const condition = {};
        if (input._id) {
            condition._id = input._id;
        }
        if (input.title) {
            condition.title = input.title;
        }
        try {
            const existedCollection = await collection_1.CollectionModel.findOne(condition).populate("products");
            if (!existedCollection) {
                return {
                    code: 400,
                    success: false,
                    message: "collection does not exist",
                };
            }
            return {
                code: 200,
                success: true,
                collection: existedCollection,
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
GetCollectionService = __decorate([
    (0, typedi_1.Service)()
], GetCollectionService);
exports.default = GetCollectionService;
//# sourceMappingURL=getCollection.service.js.map