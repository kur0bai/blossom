import { Detail } from "@/components/Character/Detail";
import { List } from "@/components/Character/List";

const Home = () => {
  return (
    <div className="flex flex-row">
      <div className="w-[25%]">
        <List />
      </div>
      <div className="w-[75%]">
        <Detail />
      </div>
    </div>
  );
};
export default Home;
