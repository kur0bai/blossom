import { CharacterDetail } from "@/components/Character/CharacterDetail";
import { List } from "@/components/Core/List";

const Home = () => {
  return (
    <div className="lg:flex flex-row">
      <div className="lg:w-[30%]">
        <List />
      </div>
      <div className="hidden lg:block lg:w-[70%]">
        <CharacterDetail />
      </div>
    </div>
  );
};
export default Home;
