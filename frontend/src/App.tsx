import Home from "@/pages/Home";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="p-6">
      <nav className="flex gap-4 mb-6">
        <Link to="/" className="text-blue-500 hover:underline">
          Home
        </Link>
        <Link to="/about" className="text-blue-500 hover:underline">
          About
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
