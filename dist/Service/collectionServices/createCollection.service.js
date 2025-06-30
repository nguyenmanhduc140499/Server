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
let CreateCollectionService = class CreateCollectionService {
    async createCollection(input) {
        try {
            if (!input.title || !input.image) {
                return {
                    code: 400,
                    success: false,
                    message: "Title and image must be required",
                };
            }
            const newCollection = await collection_1.CollectionModel.create(input);
            return {
                code: 200,
                success: true,
                collection: newCollection
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
CreateCollectionService = __decorate([
    (0, typedi_1.Service)()
], CreateCollectionService);
exports.default = CreateCollectionService;
//# sourceMappingURL=createCollection.service.js.map