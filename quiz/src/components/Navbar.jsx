import { Link, useRouterState } from "@tanstack/react-router";

export default function Navbar() {
  // detecta la ruta actual
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        <Link
          to="/"
          className={`nav-button ${pathname === "/" ? "active" : ""}`}
        >
          Inicio
        </Link>

        <Link
          to="/quiz"
          className={`nav-button ${pathname === "/quiz" ? "active" : ""}`}
        >
          Quiz
        </Link>

        <Link
          to="/pokemon"
          className={`nav-button ${pathname === "/pokemon" ? "active" : ""}`}
        >
          Pokemon
        </Link>

      </div>
    </nav>
  );
}