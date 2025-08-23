import type { ICharacter } from "@/types/character";

import { FavoriteButton } from "../Favorites/FavoriteButton";
import { useCharacterStore } from "@/store/useCharacterStore";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useNavigate } from "react-router-dom";

interface CardProps {
  character: ICharacter;
}

export const Card: React.FC<CardProps> = ({ character }) => {
  const setCharacter = useCharacterStore((state) => state.setCharacter);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleClick = () => {
    if (isMobile) {
      navigate(`/detail/${character.external_id}`);
      setCharacter(character);
    } else {
      setCharacter(character);
    }
  };
  return (
    <div
      className="flex flex-row px-4 py-6 gap-10 bg-red-500 border-t rounded-lg bg-white hover:bg-primary-100 duration-300 items-center cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-10 h-10 relative rounded-full overflow-hidden bg-gray-100">
        <img
          src={character?.image}
          className="object-cover"
          alt={character?.name}
        />
      </div>
      <div className="leading-tight w-1/2">
        <h3 className="text-xl font-semibold">{character.name}</h3>
        <span className="text-gray-400">{character.species}</span>
      </div>
      <FavoriteButton character={character} />
    </div>
  );
};
