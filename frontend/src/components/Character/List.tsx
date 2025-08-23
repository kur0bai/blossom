import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Card } from "./Card";
import type { ICharacter } from "@/types/character";
import { Filter } from "./Filter";

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

type GetCharactersData = {
  characters: ICharacter[];
};

export const List = () => {
  const { data, loading, error } = useQuery<GetCharactersData>(GET_CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p> Error: {error.message}</p>;

  return (
    <div className="w-full flex flex-col bg-gray-100/20 p-4">
      <h2 className="text-gray-700 font-bold text-3xl mb-4">
        Rick and Morty list
      </h2>
      <Filter />
      <div className="my-2" />
      {data?.characters.map((char: any) => (
        <Card character={char} />
      ))}
    </div>
  );
};
