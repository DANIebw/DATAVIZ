// src/pages/analyse.tsx
import { useEffect, useState } from "react";

function Analyse() {
  const [tournages, setTournages] = useState([]);

  useEffect(() => {
    async function load() {
      const response = await fetch(
        "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=20"
      );
      const data = await response.json();
      setTournages(data.results);
    }

    load();
  }, []);

  return (
    <div>
      <h1>Page Analyse</h1>
      <p>Tournages récupérés : {tournages.length}</p>
    </div>
  );
}

export default Analyse;
