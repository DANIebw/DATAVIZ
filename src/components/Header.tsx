// Import de NavLink pour créer des liens vers les routes React Router
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="border-b border-white/10 bg-sky-950 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-sm text-with font-semibold tracking-wide">
          Dataviz Cinéma – France
        </div>
        <nav className="flex gap-2 text-sm">
          {/* lien de navigation vers la page d'accueil */}
          <NavLink
            // chemin de la route a afficher quand on clique
            to="/"
            // "isActive" est fourni automatiquement par React Router Ça récupère une info automatique donnée par React Router
            className={({ isActive }) =>
              "px-4 py-2 rounded-xl transition " +
              (isActive
                ? // c'est pour montrer la page ou je me trouve et change la couleurs des boutons
                  "bg-sky-200 text-sky-950 font-semibold"
                : // hover au survol la couleurs change
                  "text-sky-200 hover:bg-red-900/50")
            }
          >
            Accueil
          </NavLink>

          <NavLink
            to="/analyse"
            className={({ isActive }) =>
              "px-4 py-2 rounded-xl transition " +
              (isActive
                ? "bg-sky-200 text-sky-900 font-semibold"
                : "text-sky-200 hover:bg-red-900/50")
            }
          >
            Analyse
          </NavLink>

          <NavLink
            to="/info"
            className={({ isActive }) =>
              "px-4 py-2 rounded-xl transition " +
              (isActive
                ? "bg-sky-200 text-sky-900 font-semibold"
                : "text-sky-200 hover:bg-red-900/50")
            }
          >
            Information
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
