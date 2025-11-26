// src/pages/Home.tsx
import { useEffect, useState } from "react";

type Tournage = {
  titre?: string;
  annee_tournage?: string;
  nom_realisateur?: string;
  adresse_lieu?: string;
};

function Home() {
  const [tournages, setTournages] = useState<Tournage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(
          "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records?limit=50"
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

  return (
    <>
      {/* HERO */}
      <section className="min-h-[360px] bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Dataviz Cinéma – France
          </h1>
          <p className="opacity-90 mb-6 text-sm md:text-base leading-relaxed">
            Visualisez l’activité cinématographique à travers les lieux de
            tournage à Paris : tendances par année, types de tournage,
            arrondissements, réalisateurs et plus encore.
          </p>

          <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
            Explorer les analyses
          </button>
        </div>
      </section>

      {/* CARTES */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* 1ère carte avec le nombre */}
          <div className="bg-white text-black p-6 rounded-xl shadow">
            <p>
              Nombre de tournages par année pour repérer les pics d’activité.
            </p>

            {!loading && (
              <p className="text-3xl font-bold mt-4 text-center">
                {tournages.length}
              </p>
            )}
          </div>

          <div className="bg-white text-black p-6 rounded-xl shadow">
            Long métrage, Série TV, Téléfilm… suivez l’évolution par type.
          </div>

          <div className="bg-white text-black p-6 rounded-xl shadow">
            Répartition des tournages par arrondissement parisien.
          </div>

          <div className="bg-white text-black p-6 rounded-xl shadow">
            Classement des réalisateurs les plus présents à Paris.
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#f5f5f5] text-black py-12 border-t border-black/10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-semibold mb-2">À propos du projet</h3>
            <p className="opacity-80">
              Projet construit avec React + TypeScript, Vite, React Router,
              TailwindCSS <br />
              Consomme l’API Open Data Paris pour visualiser des données de
              tournage : années, types de production, arrondissements et
              réalisateurs.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Ressources utiles</h3>
            <ul className="space-y-1">
              <li className="underline cursor-pointer">a spécifié</li>
              <li className="underline cursor-pointer">a spécifié</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Crédits</h3>
            <p className="opacity-80">Créé par Danielle, Mathis et Marine</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
