import { gql } from "apollo-server-express";

export const typeDefs = gql`
  enum Status {
    Alive
    Dead
    unknown
  }
  enum Gender {
    Female
    Male
    Genderless
    unknown
  }

  type Origin {
    id: ID!
    name: String!
  }

  type Character {
    id: ID!
    external_id: Int!
    name: String!
    status: Status!
    species: String!
    gender: Gender!
    image: String
    origin: Origin
  }

  input CharacterFilter {
    status: Status
    species: String
    gender: Gender
    name: String
    origin: String
  }

  type CharacterConnection {
    total: Int!
    items: [Character!]!
  }

  type Query {
    characters(
      filter: CharacterFilter
      limit: Int = 20
      offset: Int = 0
    ): CharacterConnection!
    health: String!
  }
`;
