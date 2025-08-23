import { gql } from "@apollo/client";

const ADD_COMMENT = gql`
  mutation AddComment($characterId: ID!, $content: String!) {
    addComment(characterId: $characterId, content: $content) {
      id
      content
      createdAt
    }
  }
`;
export { ADD_COMMENT };
