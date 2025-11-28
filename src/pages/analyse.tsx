// src/pages/Analyse.tsx
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import sallecinema from "/src/images/sallecinema.jpg";
// import BarChartByType from "/src/components/BarChartByType.tsx";
// src/components/LineChartByYear.tsx

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
          "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=100"
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

  // regroupement par types
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

  // les graphiques
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* graphique 1 */}
      <h2 className="text-2xl font-semibold mb-4">
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
      {/* graphique 2 */}
      <h2 className="text-2xl font-semibold mb-4 mt-10">
        Graphique — Répartition par type de tournage
      </h2>
      <div className="w-full flex justify-center my-8">
        <BarChart width={500} height={300} data={dataTypes}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </div>
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
          {/* Affichage d’un aperçu des tournages */}
          {!loading && !error && (
            <>
              {/* 🔹 Grille 2 x 2 de boîtes pour les graphiques */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-with ">
                {/* Box 1 */}

                {/* Box 2 */}
                <div className="bg-sky-950/60 rounded-xl p-6 shadow-lg flex flex-col gap-4">
                  <h2 className="text-lg font-semibold">
                    {" "}
                    Long métrage, Série TV, Téléfilm…
                  </h2>
                  <p className="text-xs opacity-80">...</p>
                  <div className="w-full flex justify-center border border-dashed border-white/30 rounded-lg py-10 text-xs opacity-70">
                    {/* Tu mettras ton 2e graphique ici */}
                    Graphique à venir
                  </div>
                </div>

                {/* Box 3 */}
                <div className="bg-sky-950/60 rounded-xl p-6 shadow-lg flex flex-col gap-4">
                  <h2 className="text-lg font-semibold">
                    Répartition des tournages par arrondissement parisien.
                  </h2>
                  <p className="text-xs opacity-80">...</p>
                  <div className="w-full flex justify-center border border-dashed border-white/30 rounded-lg py-10 text-xs opacity-70">
                    {/* Tu mettras ton 3e graphique ici */}
                    Graphique à venir
                  </div>
                </div>

                {/* Box 4 */}
                <div className="bg-sky-950/60 rounded-xl p-6 shadow-lg flex flex-col gap-4">
                  <h2 className="text-lg font-semibold">
                    Classement des réalisateurs les plus présents à Paris.
                  </h2>
                  <p className="text-xs opacity-80">...</p>
                  <div className="w-full flex justify-center border border-dashed border-white/30 rounded-lg py-10 text-xs opacity-70">
                    {/* Tu mettras ton 4e graphique ici */}
                    Graphique à venir
                  </div>
                </div>
              </div>

              {/* 🔹 Tes cartes de tournages en dessous */}
              <div className="grid gap-5 text-with ">
                {tournages.slice(0, 50).map((t, index) => (
                  <div
                    key={index}
                    className="border border-white/10 rounded-xl p-4 bg-sky-950/60"
                  >
                    <p className="font-semibold">
                      {t.titre || "Titre inconnu"}
                    </p>
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
      /* Affichage d’un aperçu des tournages */
      {!loading && !error && (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            {tournages.slice(0, 10).map((t, index) => (
              <div
                key={index}
                className="border border-white/10 rounded-xl p-4 bg-white/5"
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
