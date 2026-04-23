import { useEffect } from 'react'
import {
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  Outlet,
  useLocation,
} from '@tanstack/react-router'

import Saludo from './components/SaludosWayner'
import QuizComponents from './components/Quiz'
import BuscarPokemon from './components/BuscarPokemon'
import './App.css'

/* =========================
   ROOT LAYOUT (NAVBAR APPLE)
========================= */
const rootRoute = createRootRoute({
  component: function RootLayout() {
    const location = useLocation()

    useEffect(() => {
      const path = location.pathname
      if (path === '/quiz') {
        document.title = 'Quiz'
      } else if (path === '/pokemon') {
        document.title = 'Pokemon'
      } else {
        document.title = 'Inicio'
      }
    }, [location.pathname])

    return (
      <>
        {/* 🍎 NAVBAR APPLE */}
        <nav className="navbar">
          <div className="navbar-inner">

            <Link
              to="/"
              className="nav-button"
              activeProps={{ className: "nav-button active" }}
            >
              Inicio
            </Link>

            <Link
              to="/quiz"
              className="nav-button"
              activeProps={{ className: "nav-button active" }}
            >
              Quiz
            </Link>

            <Link
              to="/pokemon"
              className="nav-button"
              activeProps={{ className: "nav-button active" }}
            >
              Pokemon
            </Link>

          </div>
        </nav>

        {/* CONTENIDO */}
        <section id="content" style={{ padding: '1rem' }}>
          <Outlet />
        </section>
      </>
    )
  },
})

/* =========================
   RUTAS
========================= */

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Saludo,
})

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quiz",
  component: QuizComponents,
})

const pokemonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pokemon",
  component: BuscarPokemon,
})

/* =========================
   ROUTER
========================= */

const routeTree = rootRoute.addChildren([
  indexRoute,
  quizRoute,
  pokemonRoute,
])

export const router = createRouter({
  routeTree,
})