require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const logger = require("./middleware/logger");
const { sequelize } = require("./models");

const app = express();
app.use(logger);

async function start() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  await sequelize.authenticate();
  console.log("DB connected");

  app.listen(process.env.PORT, () =>
    console.log(
      `Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
    )
  );
}
start();
