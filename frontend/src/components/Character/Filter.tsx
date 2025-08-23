import { LucideSearch } from "lucide-react";
import { FilterPanelButton } from "./FilterPanelButton";
import { type Dispatch, type SetStateAction } from "react";

interface FilterProps {
  onSearchChange: (value: string) => void;
  setIsPanelOpen: Dispatch<SetStateAction<boolean>>;
  isPanelOpen: boolean;
}

export const Filter = ({
  onSearchChange,
  setIsPanelOpen,
  isPanelOpen,
}: FilterProps) => {
  return (
    <div className="bg-gray-100 flex flex-row items-center py-2 px-4 rounded-lg justify-between">
      <LucideSearch className="text-gray-400" />{" "}
      <input
        type="text"
        className="border-none bg-transparent px-2 py-1 focus:outline-none"
        placeholder="Search or filter results"
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <FilterPanelButton onClick={() => setIsPanelOpen(!isPanelOpen)} />
    </div>
  );
};
