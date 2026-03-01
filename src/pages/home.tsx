// src/pages/Home.tsx
import { useEffect, useState } from "react";
import cinemaHero from "../images/cinema.png";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

type Tournage = {
  nom_tournage?: string;
  annee_tournage?: string;
  nom_realisateur?: string;
  adresse_lieu?: string;
  type_tournage?: string;
  ardt_lieu?: string;
  geo_point_2d?: string;
};

function Home() {
  const [tournages, setTournages] = useState<Tournage[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Récupération des données depuis l'API
  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(
          "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=100"
        );
        const data = await response.json();
        setTournages(data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // Regroupement par année pour les petites cartes
  const tournagesParAnnee = tournages.reduce<Record<string, number>>(
    (acc, t) => {
      const annee = t.annee_tournage;
      if (!annee) return acc;
      acc[annee] = (acc[annee] || 0) + 1;
      return acc;
    },
    {}
  );

  // On trie les années pour un affichage propre (du plus ancien au plus récent)
  const entriesTournagesParAnnee = Object.entries(tournagesParAnnee).sort(
    (a, b) => Number(a[0]) - Number(b[0])
  );

  // 🔹 Stats globales pour les 3 grandes cartes
  const typesUniques = new Set(
    tournages.map((t) => t.type_tournage || "Inconnu")
  ).size;

  const arrondissementsUniques = new Set(
    tournages.map((t) => t.ardt_lieu || "Inconnu")
  ).size;

  const realisateursUniques = new Set(
    tournages.map((t) => t.nom_realisateur || "Inconnu")
  ).size;

  return (
    <>
      {/* HERO */}
      <section
        className="relative h-[450px] bg-cover bg-center bg-no-repeat flex items-center justify-center text-center px-10"
        style={{ backgroundImage: `url(${cinemaHero})` }}
      >
        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Contenu */}
        <div className="relative z-10 max-w-3xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-9">
            Dataviz Cinéma – France
          </h1>

          <p className="opacity-90 mb-6 text-sm md:text-base leading-relaxed">
            Visualisez l’activité cinématographique à travers les lieux de
            tournage à Paris : tendances par année, types de tournage,
            arrondissements, réalisateurs et plus encore.
          </p>

          {/* Bouton vers /analyse */}
          <Link
            to="/analyse"
            className="inline-block bg-sky-200 text-sky-950 px-4 py-2 rounded-md font-medium text-sm hover:bg-sky-200/70 transition"
          >
            Aller à l'analyse
          </Link>
        </div>
      </section>

      {/* CARTES */}
      <section className="py-12 bg-sky-200">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-10">
          {/* Titre */}
          <h2 className="text-sky-900 text-xl md:text-2xl font-semibold text-center">
            Nombre de tournages par année
          </h2>

          {/* Ligne des petites cartes (années) */}
          <div className="w-full flex flex-wrap justify-center gap-4 md:flex-nowrap md:justify-between lg:justify-center">
            {!loading &&
              entriesTournagesParAnnee.map(([annee, count]) => (
                <div
                  key={annee}
                  className="min-w-[80px] sm:min-w-[96px] md:min-w-[110px] lg:min-w-[130px]
                             h-24 flex flex-col justify-center items-center
                             bg-sky-800/80 text-white rounded-3xl shadow
                             hover:bg-red-900/60 hover:scale-105 transition text-center"
                >
                  <p className="text-xs font-semibold tracking-wide">{annee}</p>
                  <p className="text-2xl font-bold mt-1">{count}</p>
                </div>
              ))}
          </div>

          {/* 🔹 Ligne des 3 grandes cartes */}
          <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
            <div className="group bg-sky-800/80 text-white p-8 rounded-3xl shadow hover:bg-red-900/60 hover:scale-105 transition text-center">
              <p className="text-lg">Types de tournages</p>
              {!loading && (
                <p className="text-4xl font-extrabold mt-4">{typesUniques}</p>
              )}
              {loading && (
                <p className="mt-4 text-sm opacity-70">Chargement...</p>
              )}
            </div>

            <div className="group bg-sky-800/80 text-white p-8 rounded-3xl shadow hover:bg-red-900/60 hover:scale-105 transition text-center">
              <p className="text-lg">Arrondissements concernés</p>
              {!loading && (
                <p className="text-4xl font-extrabold mt-4">
                  {arrondissementsUniques}
                </p>
              )}
              {loading && (
                <p className="mt-4 text-sm opacity-70">Chargement...</p>
              )}
            </div>

            <div className="group bg-sky-800/80 text-white p-8 rounded-3xl shadow hover:bg-red-900/60 hover:scale-105 transition text-center">
              <p className="text-lg">Réalisateurs les plus présents</p>
              {!loading && (
                <p className="text-4xl font-extrabold mt-4">
                  {realisateursUniques}
                </p>
              )}
              {loading && (
                <p className="mt-4 text-sm opacity-70">Chargement...</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

export default Home;
