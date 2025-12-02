function Footer() {
  return (
    <footer className="bg-sky-950 text-with py-12 ">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-sm">
        {/* details du projets------------------------ */}
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
        {/* ressources---------------------------------- */}
        <div>
          <h3 className="font-semibold mb-2">Ressources utiles</h3>
          <ul className="space-y-1">
            <li className="underline cursor-pointer">a spécifié</li>
            <li className="underline cursor-pointer">a spécifié</li>
          </ul>
        </div>
        {/* auteurs--------------------------------------------- */}
        <div>
          <h3 className="font-semibold mb-2">Auteurs</h3>
          <p className="opacity-80">Créé par Danielle, Mathis et Marine</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
