import {
  CHARACTER_BUTTONS,
  SORT_BUTTONS,
  SPECIE_BUTTONS,
} from "@/constants/filterButtons";
import clsx from "clsx";
import { useState } from "react";

interface FilterPanelProps {
  characterFilter: string;
  specieFilter: string;
  onApplyFilter: (character: string, specie: string, sort: "az" | "za") => void;
  sortFilter: string;
}

export const FilterPanel = ({
  characterFilter,
  specieFilter,
  onApplyFilter,
  sortFilter,
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
    <div className="absolute top-36 bg-white shadow w-[25%] left-3 border mx-auto z-[100] px-8 py-6 rounded-lg gap-4 flex flex-col">
      <div>
        <h3 className="text-gray-400 mb-4">Sort by</h3>
        <div className="flex flex-row justify-between gap-5">
          {SORT_BUTTONS.map((btn) => (
            <button
              key={btn.id}
              className={clsx(
                "border w-full py-4 rounded-md duration-300 capitalize",
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
                "border w-full py-4 rounded-md duration-300 capitalize",
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
                "border w-full py-4 rounded-md duration-300 capitalize",
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

      <div>
        <button
          className="bg-primary-700 text-white min-w-[200px] hover:text-primary-600  py-4 rounded-md duration-300 capitalize w-full"
          onClick={handleApply}
        >
          Filter
        </button>
      </div>
    </div>
  );
};
