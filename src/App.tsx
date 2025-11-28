import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.tsx";
import Home from "./pages/home.tsx";
import Analyse from "./pages/analyse.tsx";
import Info from "./pages/info.tsx";

function App() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Header visible partout */}
      <Header />

      {/* Contenu des pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyse" element={<Analyse />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </div>
  );
}

export default App;
