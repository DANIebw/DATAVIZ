// src/pages/Home.tsx
import { useEffect, useState } from "react";
import cinemaHero from "../assets/cinema.png";

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

      <section
        className="relative h-[450px] bg-cover bg-center bg-no-repeat flex items-center justify-center text-center px-10"
        style={{ backgroundImage: `url(${cinemaHero})` }}
      >
        {/* Overlay sombre sur toute l'image */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Contenu */}
        <div className="relative z-10 max-w-3xl text-white">
          <h1 className="text-5xl md:text-5xl font-bold mb-9">
            Dataviz Cinéma – France
          </h1>

          <p className="opacity-90 mb-6 text-sm md:text-base leading-relaxed">
            Visualisez l’activité cinématographique à travers les lieux de
            tournage à Paris : tendances par année, types de tournage,
            arrondissements, réalisateurs et plus encore.
          </p>

          <button className="bg-sky-200 text-sky-950 px-6 py-3 rounded-xl font-semibold hover:bg-sky-200/50 transition">
            Explorer les analyses
          </button>
        </div>
      </section>

      {/* CARTES */}
      <section className="py-12 bg-sky-200">
        <div className="max-w-6xl mx-auto px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <div className="group bg-sky-950/50 text-white p-6 rounded-xl shadow hover:bg-red-900/50  hover:scale-105 transition ">
            <p className="">Nombre de tournages par année.</p>

            {!loading && (
              <p className="text-3xl font-bold mt-4 text-center group-hover:text-with">
                {tournages.length}
              </p>
            )}
          </div>

          {/* Card 2 */}
          <div className="group bg-sky-950/50 text-white p-6 rounded-xl shadow hover:bg-red-900/50  hover:scale-105 transition">
            <p className="">Long métrage, Série TV, Téléfilm…</p>
            {!loading && (
              <p className="text-3xl font-bold mt-4 text-center group-hover:text-with">
                {tournages.length}
              </p>
            )}
          </div>

          {/* Card 3 */}
          <div className="group bg-sky-950/50 text-white p-6 rounded-xl shadow hover:bg-red-900/50  hover:scale-105 transition">
            <p className="">
              Répartition des tournages par arrondissement parisien.
            </p>
            {!loading && (
              <p className="text-3xl font-bold mt-4 text-center group-hover:text-with">
                {tournages.length}
              </p>
            )}
          </div>

          {/* Card 4 */}
          <div className="group bg-sky-950/50 text-white p-6 rounded-xl shadow hover:bg-red-900/50  hover:scale-105 transition">
            <p className="">
              Classement des réalisateurs les plus présents à Paris."
            </p>
            {!loading && (
              <p className="text-3xl font-bold mt-4 text-center group-hover:text-with">
                {tournages.length}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-sky-950 text-with py-12 ">
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
