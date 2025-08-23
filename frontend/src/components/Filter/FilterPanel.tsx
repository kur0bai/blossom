import {
  CHARACTER_BUTTONS,
  SORT_BUTTONS,
  SPECIE_BUTTONS,
} from "@/constants/filterButtons";
import clsx from "clsx";
import { LucideArrowLeft } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
interface FilterPanelProps {
  characterFilter: string;
  specieFilter: string;
  onApplyFilter: (character: string, specie: string, sort: "az" | "za") => void;
  sortFilter: string;
  setIsPanelOpen: Dispatch<SetStateAction<boolean>>;
}

export const FilterPanel = ({
  characterFilter,
  specieFilter,
  onApplyFilter,
  sortFilter,
  setIsPanelOpen,
}: FilterPanelProps) => {
  //I'll use temp filters to avoid instant filtering xd
  const [localCharacterFilter, setLocalCharacterFilter] =
    useState(characterFilter);
  const [localSpecieFilter, setLocalSpecieFilter] = useState(specieFilter);
  const [localSortFilter, setLocalSortFilter] = useState(sortFilter);

  const handleApply = () => {
    onApplyFilter(
      localCharacterFilter,
      localSpecieFilter,
      localSortFilter as "az" | "za"
    );
  };

  return (
    <div className="h-screen lg:h-[45vh] top-0 left-0 w-full absolute lg:top-36 bg-white shadow-lg lg:w-[90%] lg:left-5 border mx-auto z-[100] px-8 py-6 rounded-lg gap-4 flex flex-col">
      {/* Mobile version */}
      <div className="lg:hidden flex w-full items-center justify-center mb-5">
        <button onClick={() => setIsPanelOpen && setIsPanelOpen(false)}>
          <LucideArrowLeft size={30} className="text-primary-600" />
        </button>
        <h3 className="text-center w-full text-gray-600 font-bold text-lg">
          Filters
        </h3>
      </div>
      <div>
        <h3 className="text-gray-400 mb-4">Sort by</h3>
        <div className="flex flex-row justify-between gap-5">
          {SORT_BUTTONS.map((btn) => (
            <button
              key={btn.id}
              className={clsx(
                "border w-full py-2 rounded-md duration-300 capitalize",
                localSortFilter === btn.value
                  ? "bg-primary-100 text-primary-700"
                  : "bg-white hover:text-primary-700 hover:bg-primary-100"
              )}
              onClick={() => setLocalSortFilter(btn.value)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-gray-400 mb-4">Character</h3>
        <div className="flex flex-row justify-between gap-5">
          {CHARACTER_BUTTONS.map((btn) => (
            <button
              key={btn.id}
              className={clsx(
                "border w-full py-2 rounded-md duration-300 capitalize",
                localCharacterFilter === btn.value
                  ? "bg-primary-100 text-primary-700"
                  : "bg-white hover:text-primary-700 hover:bg-primary-100"
              )}
              onClick={() => setLocalCharacterFilter(btn.value)}
            >
              {btn.value}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-gray-400 mb-4">Specie</h3>
        <div className="flex flex-row justify-between gap-5">
          {SPECIE_BUTTONS.map((btn) => (
            <button
              key={btn.id}
              className={clsx(
                "border w-full py-2 rounded-md duration-300 capitalize",
                localSpecieFilter === btn.value
                  ? "bg-primary-100 text-primary-700"
                  : "bg-white hover:text-primary-700 hover:bg-primary-100"
              )}
              onClick={() => setLocalSpecieFilter(btn.value)}
            >
              {btn.value}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 w-[85%] lg:block my-5">
        <button
          className="bg-primary-600 hover:bg-primary-700 text-white min-w-[200px] py-2 rounded-lg duration-300 capitalize w-full"
          onClick={handleApply}
        >
          Filter
        </button>
      </div>
    </div>
  );
};
