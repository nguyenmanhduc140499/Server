"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const collection_service_1 = require("../Service/collection.service");
const collection_resolver_1 = __importDefault(require("./collection.resolver"));
const product_resolver_1 = __importDefault(require("./product.resolver"));
const user_resolver_1 = __importDefault(require("./user.resolver"));
const order_resolver_1 = __importDefault(require("./order.resolver"));
exports.resolvers = [product_resolver_1.default, collection_resolver_1.default, collection_service_1.CollectionService, user_resolver_1.default, order_resolver_1.default];
//# sourceMappingURL=index.js.map