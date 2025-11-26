// src/pages/Analyse.tsx
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

type Tournage = {
  titre?: string;
  annee_tournage?: string;
  nom_realisateur?: string;
  adresse_lieu?: string;
};

function Analyse() {
  const [tournages, setTournages] = useState<Tournage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  console.log("tournages state :", tournages);

  // 🔵 Regrouper les tournages par année
  const dataParAnnee = tournages.reduce((acc: any[], t) => {
    const annee = t.annee_tournage || "Inconnue";

    const exist = acc.find((item) => item.annee === annee);

    if (exist) {
      exist.count += 1;
    } else {
      acc.push({ annee, count: 1 });
    }

    return acc;
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 bg-sky-200">
      <div className="mb-6">
        {loading && <p className="opacity-70">Chargement des données… ⏳</p>}

        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && (
          <p className="opacity-80 text-xs text-sky-950">
            On a récupéré{" "}
            <span className="font-semibold  opacity-80 text-sky-950">
              {tournages.length}
            </span>{" "}
            tournages pour les futurs graphiques... 🎬
          </p>
        )}
      </div>

      {/* Affichage d’un aperçu des tournages */}
      {!loading && !error && (
        <>
          <h2 className="text-2xl font-semibold text-sky-950 mb-4">
            Graphique — Tournages par année
          </h2>
          <div className="w-full flex justify-center my-8">
            <BarChart data={dataParAnnee} width={500} height={300}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="annee" />
              <YAxis />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </div>

          <div className="grid gap-5 text-with ">
            {tournages.slice(0, 50).map((t, index) => (
              <div
                key={index}
                className="border border-white/10 rounded-xl p-4 bg-sky-950/60"
              >
                <p className="font-semibold">{t.titre || "Titre inconnu"}</p>
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
        </>
      )}
    </main>
  );
}

export default Analyse;
