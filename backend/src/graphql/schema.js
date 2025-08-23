const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Origin {
    id: ID!
    name: String!
  }

  type Comment {
    id: ID!
    content: String!
    characterId: Int!
    userId: Int
    createdAt: String!
  }

  type Character {
    id: ID!
    external_id: Int!
    name: String!
    species: String
    status: String
    gender: String
    image: String
    origin: Origin
    comments: [Comment!]!
  }

  type Query {
    characters: [Character!]!
    character(id: ID!): Character
    commentsByCharacter(characterId: ID!): [Comment!]!
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

    addComment(characterId: ID!, content: String!, userId: Int): Comment!
  }
`;

module.exports = { typeDefs };
