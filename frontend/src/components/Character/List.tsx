import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Card } from "./Card";
import type { ICharacter } from "@/types/character";
import { Filter } from "./Filter";
import { useState } from "react";
import { FilterPanel } from "./FilterPanel";

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
  //filters hehe
  const [search, setSearch] = useState("");
  const [characterFilter, setCharacterFilter] = useState("all");
  const [specieFilter, setSpecieFilter] = useState("all");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [sortFilter, setSortFilter] = useState<"az" | "za">("az");

  if (loading) return <p>Loading...</p>;
  if (error) return <p> Error: {error.message}</p>;

  let characters = [...(data?.characters || [])].filter((char) =>
    char.name.toLowerCase().includes(search.toLowerCase())
  );

  //filtering by specie :D
  if (specieFilter !== "all") {
    characters = characters.filter(
      (c) => c.species.toLowerCase() === specieFilter.toLowerCase()
    );
  }

  if (characterFilter !== "all") {
    if (characterFilter === "starred") {
      characters = characters.filter((c) => c.status === "Alive");
    } else if (characterFilter === "others") {
      characters = characters.filter((c) => c.status !== "Alive");
    }
  }

  characters = [...characters].sort((a, b) => {
    if (sortFilter === "az") return a.name.localeCompare(b.name);
    if (sortFilter === "za") return b.name.localeCompare(a.name);
    return 0;
  });

  const handleApplyFilter = (
    character: string,
    specie: string,
    sort: "az" | "za"
  ) => {
    setCharacterFilter(character);
    setSpecieFilter(specie);
    setSortFilter(sort);
    setIsPanelOpen(false);
  };

  return (
    <div className="w-full flex flex-col bg-gray-100/20 p-4">
      <h2 className="text-gray-700 font-bold text-3xl mb-4">
        Rick and Morty list
      </h2>
      <Filter
        onSearchChange={setSearch}
        isPanelOpen={isPanelOpen}
        setIsPanelOpen={setIsPanelOpen}
      />
      {isPanelOpen && (
        <FilterPanel
          characterFilter={characterFilter}
          specieFilter={specieFilter}
          onApplyFilter={handleApplyFilter}
          sortFilter={sortFilter}
        />
      )}
      <div className="my-2" />
      {characters.map((character: ICharacter) => (
        <Card key={character.external_id} character={character} />
      ))}
    </div>
  );
};
