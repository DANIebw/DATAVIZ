import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/analyse">Analyse</NavLink>
      </nav>
    </header>
  );
}

export default Header;
