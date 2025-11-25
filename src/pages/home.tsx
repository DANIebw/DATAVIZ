<<<<<<< HEAD
import { useEffect, useState } from "react";

function Home() {
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
=======
// src/pages/Home.tsx
function Home() {
  return <h1>Page d'accueil</h1>;
>>>>>>> page-analyse
}
export default Home;
