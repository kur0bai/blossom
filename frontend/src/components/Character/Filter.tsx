import { LucideSearch } from "lucide-react";
import { FilterPanelButton } from "./FilterPanelButton";
import { useState } from "react";
import { FilterPanel } from "./FilterPanel";

export const Filter = () => {
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

  return (
    <div className="bg-gray-100 flex flex-row items-center py-2 px-4 rounded-lg justify-between">
      <LucideSearch className="text-gray-400" />{" "}
      <input
        type="text"
        className="border-none bg-transparent px-2 py-1 focus:outline-none"
        placeholder="Search or filter results"
      />
      <FilterPanelButton onClick={() => setIsPanelOpen(!isPanelOpen)} />
      {isPanelOpen && <FilterPanel />}
    </div>
  );
};
