import { useQuery } from "@apollo/client/react";
import type { ICharacter } from "@/types/character";
import { useState, useEffect } from "react";
import { Filter } from "../Filter/Filter";
import { FilterPanel } from "../Filter/FilterPanel";
import { FavoritesList } from "../Favorites/FavoritesList";
import { CharactersList } from "../Character/CharactersList";
import { GET_CHARACTERS } from "@/api/graphql/mutations/characters";
import { useCharacterStore } from "@/store/useCharacterStore";
import { useFavoritesStore } from "@/store/useFavoriteStore";

type GetCharactersData = {
  characters: ICharacter[];
};

export const List = () => {
  const { data, loading, error, refetch } =
    useQuery<GetCharactersData>(GET_CHARACTERS);

  const {
    commentsUpdated,
    setCommentsUpdated,
    selectedCharacter,
    setCharacter,
  } = useCharacterStore();

  // filters hehe :D
  const [search, setSearch] = useState("");
  const [characterFilter, setCharacterFilter] = useState("all");
  const [specieFilter, setSpecieFilter] = useState("all");
  const [sortFilter, setSortFilter] = useState<"az" | "za">("az");
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const isFavorite = useFavoritesStore((state) => state.isFavorite);

  // when comments are added, update
  useEffect(() => {
    if (!commentsUpdated) return;

    const update = async () => {
      const { data: newData } = await refetch();
      setCommentsUpdated(false);

      const updatedCharacter = newData?.characters?.find(
        (char) => char.external_id === selectedCharacter?.external_id
      );

      if (updatedCharacter) setCharacter(updatedCharacter);
    };

    update();
  }, [
    commentsUpdated,
    refetch,
    selectedCharacter,
    setCharacter,
    setCommentsUpdated,
  ]);

  if (loading)
    return (
      <div className="w-full flex justify-center h-screen items-center">
        <span className="text-gray-600 text-xl">Loading...</span>
      </div>
    );

  if (error)
    return (
      <div className="w-full flex justify-center h-screen items-center">
        <p className="text-xl text-red-600"> Error: {error.message}</p>
      </div>
    );

  // prevent re render favorites (duplicate)
  let characters = [...(data?.characters || [])]
    .filter((char) => char.name.toLowerCase().includes(search.toLowerCase()))
    .filter((char) => !isFavorite(char.external_id));

  if (specieFilter !== "all") {
    characters = characters.filter(
      (c) => c.species.toLowerCase() === specieFilter.toLowerCase()
    );
  }

  if (characterFilter !== "all") {
    characters = characters.filter((c) =>
      characterFilter === "starred"
        ? c.status === "Alive"
        : c.status !== "Alive"
    );
  }

  characters.sort((a, b) =>
    sortFilter === "az"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

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
    <div className="w-full flex flex-col bg-gray-100/40 p-4 px-6 relative">
      <h2 className="text-gray-700 font-bold text-3xl mb-4">
        Rick and Morty List
      </h2>

      {/* Search & Filter */}
      <Filter
        onSearchChange={setSearch}
        isPanelOpen={isPanelOpen}
        setIsPanelOpen={setIsPanelOpen}
      />

      {isPanelOpen && (
        <FilterPanel
          characterFilter={characterFilter}
          specieFilter={specieFilter}
          sortFilter={sortFilter}
          setIsPanelOpen={setIsPanelOpen}
          onApplyFilter={handleApplyFilter}
        />
      )}

      {/* Favorites */}
      <FavoritesList />

      {/* Characters */}
      <div className="my-2" />
      <CharactersList characters={characters} />
    </div>
  );
};
