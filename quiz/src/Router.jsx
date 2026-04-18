import{
    createRootRoute,
    createRoute,
    createRoter,
    Link,
    Outlet,
}from '@tanstack/react-router'

import Saludo from './components/SaludosWayner'
import QuizComponents from './components/Quiz'
import BuscarPokemon from './components/BuscarPokemon'
import './App.css'



//paso 2 crear la ruta raiz


const rootRoute = createRootRoute({
    component: function RootLayout(){
        return(
            <>
                <nav style={{display:'flex', gap:'1rem', padding:'1rem'}}>
                    <Link to= "/" activeProps={{style:{fontWeight:'bold'}}}>
                    inicio
                    </Link>
                    <Link to= "/quiz" activeProps={{style:{fontWeight:'bold'}}}>
                    Quiz 
                    </Link>
                    <Link to= "/pokemon" activeProps={{style:{fontWeight:'bold'}}}>
                    Pokemon
                    </Link>

                </nav>
                <seccion id="content">
                    <Outlet/>
                </seccion>
                </>
        )
    },
})
        

//paso 3 crear ruta raiz

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
      

//arbol de rutas y crracion del router
//llamar a las rutas hijas en el orden que se quieran renderizar


const routeTree = rootRoute.addChildren([indexRoute, quizRoute, pokemonRoute])

export const router = createRoter({routeTree})