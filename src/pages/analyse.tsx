// src/pages/Analyse.tsx
import { useEffect, useState } from "react";

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import sallecinema from "/src/images/sallecinema.jpg";

type Tournage = {
  titre?: string;
  annee_tournage?: string;
  nom_realisateur?: string;
  adresse_lieu?: string;
  type_tournage?: string;
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

  // 🔵 Regroupement des tournages par année
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

  // 🟣 Regroupement par type
  const dataTypes = tournages.reduce((acc: any[], t) => {
    const type = t.type_tournage || "Inconnu";
    const exist = acc.find((item) => item.type === type);

    if (exist) {
      exist.count += 1;
    } else {
      acc.push({ type, count: 1 });
    }
    return acc;
  }, []);

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed px-4 py-10"
      style={{
        backgroundImage: `linear-gradient(rgba(15,23,42,0.85), rgba(15,23,42,0.85)), url(${sallecinema})`,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* ⏳ Zone de statut */}
        <div className="mb-6">
          {loading && (
            <p className="opacity-70 text-white">Chargement des données… ⏳</p>
          )}

          {error && <p className="text-red-400">{error}</p>}

          {!loading && !error && (
            <p className="opacity-80 text-xs text-sky-100">
              On a récupéré{" "}
              <span className="font-semibold">{tournages.length}</span>{" "}
              tournages pour les futurs graphiques... 🎬
            </p>
          )}
        </div>

        {/* 🎨 Contenu principal uniquement si tout est OK */}
        {!loading && !error && (
          <>
            {/* 🔹 Grille 2x2 des boîtes / graphiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-with">
              {/* Box 1 */}
              <div className="bg-sky-950/60 rounded-xl p-6 shadow-lg flex flex-col gap-4 text-white">
                <h2 className="text-lg font-semibold">Tournages par année</h2>
                <p className="text-xs opacity-80">
                  Nombre de tournages recensés à Paris chaque année.
                </p>
                <div className="w-full flex justify-center">
                  <BarChart data={dataParAnnee} width={400} height={260}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="annee" stroke="#ffffff" />
                    <YAxis stroke="#ffffff" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#6f1d1b" />
                  </BarChart>
                </div>
              </div>

              {/* Box 2 */}
              <div className="bg-sky-950/60 rounded-xl p-6 shadow-lg flex flex-col gap-4 text-white">
                <h2 className="text-lg font-semibold">
                  Long métrage, Série TV, Téléfilm…
                </h2>
                <p className="text-xs opacity-80">
                  Répartition des types de tournages.
                </p>
                <div className="w-full flex justify-center">
                  <BarChart width={400} height={260} data={dataTypes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" stroke="#ffffff" />
                    <YAxis stroke="#ffffff" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#82ca9d" />
                  </BarChart>
                </div>
              </div>

              {/* Box 3 */}
              <div className="bg-sky-950/60 rounded-xl p-6 shadow-lg flex flex-col gap-4 text-white">
                <h2 className="text-lg font-semibold">
                  Répartition des tournages par arrondissement.
                </h2>
                <p className="text-xs opacity-80">À venir.</p>
                <div className="w-full flex justify-center border border-dashed border-white/30 rounded-lg py-10 text-xs opacity-70">
                  Graphique à venir
                </div>
              </div>

              {/* Box 4 */}
              <div className="bg-sky-950/60 rounded-xl p-6 shadow-lg flex flex-col gap-4 text-white">
                <h2 className="text-lg font-semibold">
                  Classement des réalisateurs les plus présents à Paris.
                </h2>
                <p className="text-xs opacity-80">À venir.</p>
                <div className="w-full flex justify-center border border-dashed border-white/30 rounded-lg py-10 text-xs opacity-70">
                  Graphique à venir
                </div>
              </div>
            </div>

            {/* 🧾 Cartes de tournages */}
            <div className="grid gap-5 text-with">
              {tournages.slice(0, 50).map((t, index) => (
                <div
                  key={index}
                  className="border border-white/10 rounded-xl p-4 bg-sky-950/60 text-white"
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
      </div>
    </main>
  );
}

export default Analyse;
