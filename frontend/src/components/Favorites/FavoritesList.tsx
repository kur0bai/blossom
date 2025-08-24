import { useFavoritesStore } from "@/store/useFavoriteStore";

import { Card } from "../Character/Card";

export const FavoritesList = () => {
  const { favorites } = useFavoritesStore();
  return (
    <div className="my-5">
      {/* Starred or favorites???? */}
      <h3 className="text-md font-semibold uppercase text-gray-400 pb-5 mx-5">
        Starred Characters ({favorites.length ?? 0})
      </h3>
      <div className="overflow-y-scroll max-h-[50vh]">
        {favorites?.map((fav) => (
          <Card key={fav.external_id} character={fav} />
        ))}
      </div>
    </div>
  );
};
