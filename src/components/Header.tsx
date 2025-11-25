import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="border-b border-white/10 bg-black/30 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-sm font-semibold tracking-wide">
          Dataviz Cinéma – France
        </div>

        <nav className="flex gap-2 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              "px-4 py-2 rounded-xl transition " +
              (isActive
                ? "bg-white text-black font-semibold"
                : "text-white hover:bg-white/10")
            }
          >
            Accueil
          </NavLink>

          <NavLink
            to="/analyse"
            className={({ isActive }) =>
              "px-4 py-2 rounded-xl transition " +
              (isActive
                ? "bg-white text-black font-semibold"
                : "text-white hover:bg-white/10")
            }
          >
            Analyse
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
