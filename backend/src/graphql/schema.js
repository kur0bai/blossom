const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Origin {
    id: ID!
    name: String!
  }
  type Character {
    id: ID!
    external_id: Int!
    name: String!
    species: String
    status: String
    gender: String
    origin: Origin
  }

  type Query {
    characters: [Character!]!
    character(id: ID!): Character
  }

  type Mutation {
    createCharacter(
      external_id: Int!
      name: String!
      species: String
      status: String
      gender: String
      originId: ID
    ): Character!
  }
`;

module.exports = { typeDefs };
