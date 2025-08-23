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
  sortFilter: string;
  setIsPanelOpen: Dispatch<SetStateAction<boolean>>;
  onApplyFilter: (character: string, specie: string, sort: "az" | "za") => void;
}

interface FilterGroup<T> {
  label: string;
  options: T[];
  value: string;
  setValue: (val: string) => void;
}

export const FilterPanel = ({
  characterFilter,
  specieFilter,
  sortFilter,
  setIsPanelOpen,
  onApplyFilter,
}: FilterPanelProps) => {
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

  const renderFilterGroup = <
    T extends { id: string | number; value: string; label?: string }
  >({
    label,
    options,
    value,
    setValue,
  }: FilterGroup<T>) => (
    <div>
      <h3 className="text-gray-400 mb-4">{label}</h3>
      <div className="flex flex-row justify-between gap-5">
        {options.map((btn) => (
          <button
            key={btn.id}
            className={clsx(
              "border w-full py-2 rounded-md duration-300 capitalize",
              value === btn.value
                ? "bg-primary-100 text-primary-700"
                : "bg-white hover:text-primary-700 hover:bg-primary-100"
            )}
            onClick={() => setValue(btn.value)}
          >
            {btn.label ?? btn.value}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-screen lg:h-[45vh] top-0 left-0 w-full absolute lg:top-36 bg-white shadow-lg lg:w-[90%] lg:left-5 border mx-auto z-[100] px-8 py-6 rounded-lg gap-4 flex flex-col">
      {/* Mobile header */}
      <div className="lg:hidden flex w-full items-center justify-center mb-5">
        <button onClick={() => setIsPanelOpen(false)}>
          <LucideArrowLeft size={30} className="text-primary-600" />
        </button>
        <h3 className="text-center w-full text-gray-600 font-bold text-lg">
          Filters
        </h3>
      </div>

      {renderFilterGroup({
        label: "Sort by",
        options: SORT_BUTTONS,
        value: localSortFilter,
        setValue: setLocalSortFilter,
      })}

      {renderFilterGroup({
        label: "Character",
        options: CHARACTER_BUTTONS,
        value: localCharacterFilter,
        setValue: setLocalCharacterFilter,
      })}

      {renderFilterGroup({
        label: "Specie",
        options: SPECIE_BUTTONS,
        value: localSpecieFilter,
        setValue: setLocalSpecieFilter,
      })}

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
