import { List } from "@/components/Character/List";

const Home = () => {
  return (
    <div className="flex flex-row">
      <div className="w-[25%]">
        {" "}
        <List />
      </div>
      <div className="w-[75%]">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil ipsum
        rem voluptatibus illo nulla. Asperiores velit vitae inventore non error
        sed corporis maiores, itaque magni. Nobis unde voluptatum sequi
        incidunt?
      </div>
    </div>
  );
};
export default Home;
