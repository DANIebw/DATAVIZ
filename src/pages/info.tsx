// src/pages/Analyse.tsx

import { useEffect, useState } from "react";
// ✅ Chemin d'import de l'image : à adapter selon où est ton fichier
import sallecinema from "../images/sallecinema.jpg";

type Tournage = {
  nom_tournage?: string;
  annee_tournage?: string;
  nom_realisateur?: string;
  adresse_lieu?: string;
  type_tournage?: string;
};

function Analyse() {
  const [tournages, setTournages] = useState<Tournage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔁 Appel API au chargement du composant
  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(
          "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=50"
        );
        const data = await response.json();
        console.log("API data :", data);
        setTournages(data.results);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des données 😢");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // 🕑 État de chargement
  if (loading) {
    return (
      <main className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <p>Chargement des données...</p>
      </main>
    );
  }

  // ⚠️ Gestion d'erreur
  if (error) {
    return (
      <main className="min-h-screen bg-slate-900 flex items-center justify-center text-red-300">
        <p>{error}</p>
      </main>
    );
  }

  // ✅ Rendu principal
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed px-4 py-10"
      style={{
        backgroundImage: `linear-gradient(rgba(15,23,42,0.85), rgba(15,23,42,0.85)), url(${sallecinema})`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          Lieux de tournage à Paris 🎬
        </h1>

        <div className="grid gap-5 text-white">
          {tournages.slice(0, 50).map((t, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-xl p-4 bg-sky-950/60 text-white"
            >
              <p className="font-semibold">{t.nom_tournage}</p>
              <p className="text-sm opacity-80">
                {t.annee_tournage
                  ? `Année : ${t.annee_tournage}`
                  : "Année inconnue"}
              </p>
              {t.nom_realisateur && (
                <p className="text-sm opacity-80">
                  Réalisateur : {t.nom_realisateur}
                </p>
              )}
              {t.adresse_lieu && (
                <p className="text-xs opacity-60 mt-1">
                  Lieu : {t.adresse_lieu}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Analyse;
