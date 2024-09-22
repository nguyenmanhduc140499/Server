"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const type_graphql_1 = require("type-graphql");
const Resolver_1 = require("./Resolver");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongo_1 = require("./utils/mongo");
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const main = async () => {
    //build schema
    const schema = await (0, type_graphql_1.buildSchemaSync)({
        validate: false,
        resolvers: Resolver_1.resolvers,
    });
    //init Express
    const app = (0, express_1.default)();
    app.options('*', (0, cors_1.default)()); // Allow preflight requests for all routes
    app.use((0, cors_1.default)({ origin: [process.env.ECOMMERCE_ADMIN_URL, process.env.ECOMMERCE_STORE_URL], credentials: true, methods: 'GET,POST' }));
    app.use((0, cookie_parser_1.default)());
    //create Apollo Server
    const httpServer = (0, http_1.createServer)(app);
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground,
        ],
    });
    await server.start();
    //apply middleware
    server.applyMiddleware({ app, cors: { origin: [process.env.ECOMMERCE_ADMIN_URL, process.env.ECOMMERCE_STORE_URL], credentials: true, methods: 'GET,POST' } });
    //await app.listen()
    app.listen({ port: process.env.POST }, () => {
        console.log(`App is listening on ${process.env.GRAPHQL_URL}${server.graphqlPath}`);
    });
    //connect to db
    (0, mongo_1.connectToMongo)();
};
main();
//# sourceMappingURL=app.js.map