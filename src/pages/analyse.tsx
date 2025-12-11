import { useEffect, useState } from "react";
import sallecinema from "../images/sallecinema.jpg";
import BarChartByType from "../components/chart/BarChartByType";
import LineChartByYear from "../components/chart/LineChartByYear";
import MapByDistrict from "../components/chart/MapByDistrict";
import TopDirectorsChart from "../components/chart/TopDirectorsChart";
import Graphique from "../components/chart/graphique";

type Tournage = {
  titre: string;
  annee_tournage: string;
  nom_realisateur: string;
  adresse_lieu: string;
  type_tournage: string;
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
          {!loading && !error && tournages.length > 0 && (
            <p className="opacity-70 text-white">Chargement des données… ⏳</p>
          )}

          {error && <p className="text-red-400">{error}</p>}

          {!loading && !error && tournages.length > 0 && (
            <p className="opacity-80 text-xs text-sky-100">
              On a récupéré{" "}
              <span className="font-semibold">{tournages.length}</span>{" "}
              tournages pour les futurs graphiques... 🎬
            </p>
          )}
        </div>

        {/* 🎨 Contenu principal uniquement si tout est OK */}
        {!loading && !error && tournages.length > 0 && (
          <>
            {/* 🔹 Grille 2x2 des boîtes / graphiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-with">
              {/* BOX 1 */}
              <div className="bg-sky-950/60 rounded-xl p-6 shadow-lg flex flex-col gap-4 text-white">
                <h2 className="text-lg font-semibold">Tournages par année</h2>
                <p className="text-xs opacity-80">
                  Nombre de tournages recensés à Paris chaque année.
                </p>
                <div className="w-full flex justify-center">
                  <LineChartByYear tournages={tournages} />
                </div>
              </div>

              {/* BOX 2 */}
              <div className="bg-sky-950/60 rounded-xl p-6 shadow-lg flex flex-col gap-4 text-white">
                <h2 className="text-lg font-semibold">
                  Long métrage, Série TV, Téléfilm…
                </h2>
                <p className="text-xs opacity-80">
                  Répartition des types de tournages.
                </p>
                <div className="w-full flex justify-center">
                  <BarChartByType tournages={tournages} />
                </div>
              </div>

              {/* BOX 3 */}
              <div className="bg-sky-950/60 rounded-xl p-6 shadow-lg flex flex-col gap-4 text-white">
                <h2 className="text-lg font-semibold">
                  Répartition des tournages par arrondissement.
                </h2>
                <p className="text-xs opacity-80">
                  Nombre total de tournages par arrondissement.
                </p>
                <div className="w-full flex justify-center">
                  <MapByDistrict tournages={tournages} />
                </div>
              </div>

              {/* BOX 4 */}
              <div className="bg-sky-950/60 rounded-xl p-6 shadow-lg flex flex-col gap-4 text-white">
                <h2 className="text-lg font-semibold">
                  Classement des réalisateurs les plus présents à Paris.
                </h2>
                <p className="text-xs opacity-80">
                  Top10 des réalisateurs les plus présents.
                </p>
                <div className="w-full flex justify-center">
                  <TopDirectorsChart tournages={tournages} />
                </div>
              </div>

              {/* BOX 5 */}
              <div className="bg-sky-950/60 rounded-xl p-6 shadow-lg flex flex-col gap-4 text-white">
                <h2 className="text-lg font-semibold">
                  Répartition des tournages par thèmes et années.
                </h2>
                <p className="text-xs opacity-80">
                  Variation du nombre de tournages par type selon les années.
                </p>

                <div className="w-full flex justify-center">
                  <Graphique tournages={tournages} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default Analyse;
