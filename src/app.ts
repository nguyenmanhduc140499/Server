import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import { buildSchemaSync } from "type-graphql";
import { resolvers } from "./Resolver";
import cookieParser from "cookie-parser";
import { connectToMongo } from "./utils/mongo";
import { createServer } from "http";
import cors from 'cors'
const main = async () => {
  //build schema
  const schema = await buildSchemaSync({
    validate: false,
    resolvers,
  });

  //init Express
  const app = express();
  app.options('*', cors()); // Allow preflight requests for all routes
  app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'], credentials: true, methods: 'GET,POST' }))
  app.use(cookieParser());

  //create Apollo Server
  const httpServer = createServer(app);
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground,
    ],
  });

  await server.start();
  //apply middleware
  server.applyMiddleware({ app, cors: { origin: ['http://localhost:3000', 'http://localhost:3001'], credentials: true, methods: 'GET,POST' } });
  //await app.listen()
  app.listen({ port: 4000 }, () => {
    console.log(
      `App is listening on http://localhost:4000${server.graphqlPath}`
    );
  });
  //connect to db
  connectToMongo();
};
main();
