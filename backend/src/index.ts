import "reflect-metadata";

import { MikroORM } from "@mikro-orm/core"; // Import the ORM
import microConfig from "./mikro-orm.config"; // Import the configuration for the ORM

import { __prod__ } from "./constants"; // Import the constants

import express from "express"; // Import express for the app
import { ApolloServer } from "apollo-server-express"; // Import the apollo server
import { buildSchema } from "type-graphql"; // GraphQL improts

// Import the resolvers
import { UserResolver } from "./resolvers/user";
import { ContactResolver } from "./resolvers/contact";

// Import the context
import { MyContext } from "./types";

// For the database (does not support windows, I use WSL2)
import cors from "cors";
import Redis from "ioredis";
import session from "express-session";
import RedisStore from "connect-redis";

const main = async () => {
  // Set the origin and credentials
  cors<cors.CorsRequest>({
    origin: "https://stuido.apollographql.com",
    credentials: true,
  });

  // Set up the ORM
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  // Set up express
  const app = express();

  // Set up redis
  const redis = new Redis();
  const redisConfig: any = {
    client: redis,
    disableTouch: true,
  };
  let redisStore = new (RedisStore as any)(redisConfig);

  app.use(
    // For the session
    session({
      name: "qid",
      store: redisStore,
      cookie: {
        maxAge: 100 * 60 * 60 * 24 * 30 * 6, // 6 months cookie time limit
        httpOnly: true,
        sameSite: "lax", // CSRF
        secure: __prod__, // Cookie only works in https
      },
      saveUninitialized: false,
      secret: "bequietshhhh", // The secret for the cookies
      resave: false,
    })
  );

  // Set up the apollo server and schema
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, ContactResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
  });

  await apolloServer.start();

  // Apply the middleware
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: [process.env.CORS_ORIGIN, "https://studio.apollographql.com"],
      credentials: true,
    },
  });

  // Output "server started" to indicate that the server has started on port 3001
  app.listen(3001, () => {
    console.log("server started");
  });
};

main();
