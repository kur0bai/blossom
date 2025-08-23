import { useCharacterStore } from "@/store/useCharacterStore";

export const Detail = () => {
  const { selectedCharacter } = useCharacterStore();

  if (!selectedCharacter)
    return (
      <div className="w-full flex justify-center h-screen items-center">
        <span className="text-gray-600 text-xl">
          You have not selected any character yet.
        </span>
      </div>
    );

  return (
    <div className="px-12 py-8">
      <div className="w-24 h-24 relative rounded-full overflow-hidden bg-gray-100">
        <img
          src={selectedCharacter?.image}
          className="object-cover"
          alt={selectedCharacter?.name}
        />
      </div>
      <h3 className="text-2xl font-bold my-2">{selectedCharacter.name}</h3>

      <div className="mt-8">
        <div className="leading-tight w-full border-b py-4">
          <h3 className="text-xl font-semibold">Specie</h3>
          <span className="text-gray-400">{selectedCharacter.species}</span>
        </div>
        <div className="leading-tight w-full border-b py-4">
          <h3 className="text-xl font-semibold">Status</h3>
          <span className="text-gray-400">{selectedCharacter.status}</span>
        </div>
        <div className="leading-tight w-full border-b py-4">
          <h3 className="text-xl font-semibold">Origin</h3>
          <span className="text-gray-400">{selectedCharacter.origin.name}</span>
        </div>
      </div>
    </div>
  );
};
