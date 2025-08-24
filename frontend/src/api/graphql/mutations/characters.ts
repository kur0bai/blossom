import { gql } from "@apollo/client";

const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      id
      external_id
      name
      status
      image
      species
      gender
      comments {
        content
        createdAt
      }
      origin {
        id
        name
      }
    }
  }
`;

export { GET_CHARACTERS };
