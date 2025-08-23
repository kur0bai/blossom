import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Card } from "./Card";

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
      }
      origin {
        id
        name
      }
    }
  }
`;

export const List = () => {
  const { data, loading, error } = useQuery(GET_CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p> Error: {error.message}</p>;

  return (
    <div className="p-4 space-y-2">
      {data.characters.map((char: any) => (
        <Card character={char} />
      ))}
    </div>
  );
};
