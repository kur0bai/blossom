import type { ICharacter } from "@/types/character";

interface CardProps {
  character: ICharacter;
}

export const Card: React.FC<CardProps> = ({ character }) => {
  return (
    <div className="bg-gray-100 hover:bg-primary-100 flex flex-row">
      <div className="w-10 h-10 relative rounded-10">
        <img src={character?.image} className="w-10 h-10" />
      </div>
      <div>
        <h3>{character.name}</h3>
        <span>{character.species}</span>
      </div>
    </div>
  );
};
