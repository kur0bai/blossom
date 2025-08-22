import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import { sequelize } from "./db/index.js";
import { connectRedis } from "./cache/redis.js";

async function bootstrap() {
  const app = express();

  app.get("/health", (_, res) => res.send("ok"));

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  await sequelize.authenticate();
  await connectRedis();

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`HTTP http://localhost:${port}`);
    console.log(`GraphQL http://localhost:${port}/graphql`);
  });
}

bootstrap().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
