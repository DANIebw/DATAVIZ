// src/pages/Analyse.tsx
import { useEffect, useState } from "react";

function Analyse() {
  const [tournages, setTournages] = useState<any[]>([]);

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

  return;
  <div>
    <h1>Page d'analyse</h1>
    <p>On a récupéré {tournages.length} tournages pour les graphiques.</p>
  </div>;
}

export default Analyse;
