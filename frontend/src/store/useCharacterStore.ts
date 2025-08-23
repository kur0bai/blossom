import type { ICharacter } from "@/types/character";
import { create } from "zustand";

interface CharacterState {
  selectedCharacter: ICharacter | null;
  setCharacter: (character: ICharacter) => void;
  clearCharacter: () => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  selectedCharacter: null,
  setCharacter: (character) => set({ selectedCharacter: character }),
  clearCharacter: () => set({ selectedCharacter: null }),
}));
