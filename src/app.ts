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
import cors from "cors";

const main = async () => {
  //build schema
  const schema = await buildSchemaSync({
    validate: false,
    resolvers,
  });
  //init Express
  const app = express();
  app.options("*", cors()); // Allow preflight requests for all routes
  app.use(
    cors({
      origin: [
        process.env.ECOMMERCE_STORE_URL,
        process.env.ECOMMERCE_ADMIN_URL,
      ],
      credentials: true,
      methods: "GET,POST",
    })
  );
  app.use(cookieParser());

  //create Apollo Server
  const httpServer = createServer(app);
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground,
    ],
    introspection: true,
    cache: "bounded",
  });

  await server.start();
  //apply middleware
  server.applyMiddleware({
    app,
    cors: {
      origin: [
        process.env.ECOMMERCE_ADMIN_URL,
        process.env.ECOMMERCE_STORE_URL,
      ],
      credentials: true,
      methods: "GET,POST",
    },
  });
  //await app.listen()
  app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(
      `App is listening on ${process.env.GRAPHQL_URL}${server.graphqlPath}`
    );
  });
  //connect to db
  connectToMongo();
};
main();
