import { LucideHeart } from "lucide-react";
import React from "react";

interface StarredButtonProps {
  isStarred: boolean;
}

export const StarredButton: React.FC<StarredButtonProps> = ({ isStarred }) => {
  return (
    <div className="bg-white p-2 rounded-full">
      {isStarred ? (
        <LucideHeart fill="#63D838" className="text-secondary-600" />
      ) : (
        <LucideHeart className="text-gray-300" />
      )}
    </div>
  );
};
