import { CharacterDetail } from "@/components/Character/CharacterDetail";
import { LucideArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const Detail = () => {
  return (
    <div className="py-5 flex flex-col">
      <Link to={"/"} className="px-10 w-full">
        <LucideArrowLeft size={30} className="text-primary-600" />
      </Link>
      <CharacterDetail />
    </div>
  );
};
