import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="border-b border-white/10 bg-sky-950 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-sm text-with font-semibold tracking-wide">
          Dataviz Cinéma – France
        </div>

        <nav className="flex gap-2 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              "px-4 py-2 rounded-xl transition " +
              (isActive
                ? "bg-sky-200 text-sky-950 font-semibold"
                : "text-sky-200 hover:bg-red-900/50")
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
