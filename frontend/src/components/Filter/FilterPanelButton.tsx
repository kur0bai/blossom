import { SlidersVertical } from "lucide-react";

interface FilterPanelButtonProps {
  onClick: () => void;
}

export const FilterPanelButton: React.FC<FilterPanelButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      className="p-2 rounded hover:bg-gray-200 duration-300 focus:outline-none"
      onClick={onClick}
    >
      <SlidersVertical className="text-primary-600" />
    </button>
  );
};
