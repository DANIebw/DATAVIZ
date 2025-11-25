import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Analyse from "./pages/analyse";
import Header from "./components/Header.tsx"; // si tu crées un header

function App() {
  // creation d'un State (memoire interne à mon composant)
  const [tournages, setTournages] = useState([]);

  // 2. useEffect
  useEffect(() => {
    async function load() {
      const response = await fetch(
        "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=20"
      );
      const data = await response.json();
      console.log(data);
      setTournages(data.results);
    }
    load();
  }, []);
  console.log(tournages);

  return (
    <div>
      <h1>Dataviz</h1>
      <p>Nombre de tournages chargés : {tournages.length}</p>
    </div>
  );

  return (
    <>
      <Header /> {/* s’affiche sur toutes les pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyse" element={<Analyse />} />
      </Routes>
    </>
  );
}

export default App;
