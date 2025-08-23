import { useFavoritesStore } from "@/store/useFavoriteStore";
import type { ICharacter } from "@/types/character";
import { LucideHeart } from "lucide-react";
import React from "react";

interface FavoriteButtonProps {
  character: ICharacter;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  character,
}) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const toggleFavorite = () => {
    if (isFavorite(character.external_id)) {
      removeFavorite(character.external_id);
    } else {
      addFavorite(character);
    }
  };

  return (
    <button onClick={toggleFavorite} className="bg-white p-2 rounded-full">
      {isFavorite(character.external_id) ? (
        <LucideHeart fill="#63D838" className="text-secondary-600" />
      ) : (
        <LucideHeart className="text-gray-300" />
      )}
    </button>
  );
};
