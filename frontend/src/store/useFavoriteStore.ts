import type { ICharacter } from "@/types/character";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoritesStore = {
  favorites: ICharacter[];
  addFavorite: (character: ICharacter) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (character) => {
        const exists = get().favorites.some(
          (fav) => fav.external_id === character.external_id
        );
        if (!exists) {
          set((state) => ({
            favorites: [...state.favorites, character],
          }));
        }
      },
      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.external_id !== id),
        }));
      },
      isFavorite: (id) => {
        return get().favorites.some((fav) => fav.external_id === id);
      },
    }),
    {
      name: "favorites-storage",
    }
  )
);
