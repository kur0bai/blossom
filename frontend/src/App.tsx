import Home from "@/pages/Home";
import { Routes, Route } from "react-router-dom";
import { Detail } from "./pages/Detail";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
