import { Detail } from "@/components/Character/CharacterDetail";
import { List } from "@/components/Core/List";

const Home = () => {
  return (
    <div className="flex flex-row">
      <div className="w-[30%]">
        <List />
      </div>
      <div className="w-[70%]">
        <Detail />
      </div>
    </div>
  );
};
export default Home;
