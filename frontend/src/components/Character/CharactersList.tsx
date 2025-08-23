import type { ICharacter } from "@/types/character";
import { Card } from "./Card";

interface CharactersListProps {
  characters: ICharacter[];
}
export const CharactersList: React.FC<CharactersListProps> = ({
  characters,
}) => {
  return (
    <div>
      <h3 className="text-md font-semibold uppercase text-gray-400 pb-5 mx-5">
        Characters ({characters.length ?? 0})
      </h3>

      {characters.map((character: ICharacter) => (
        <Card key={character.external_id} character={character} />
      ))}
    </div>
  );
};
