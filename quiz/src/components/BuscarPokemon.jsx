import { useState } from 'react'
import './BuscarPokemon.css'

export default function BuscarPokemon() {
    const [nombre, setNombre] = useState("")
    const [pokemon, setPokemon] = useState(null);

    const buscarPokemon = async() => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
            const data = await response.json();
            setPokemon(data);
        } catch (error) {
            console.error('Error al buscar pokemon:', error);
            setPokemon(null);
        }
    };

  return (
    <section className="pokemon-container">
      <h1 className="pokemon-page-title">Pokemon</h1>
      <h2 className="pokemon-titulo">¡Descubre el Mundo Pokemon!</h2>
      <p className="pokemon-texto">Busca tu Pokemon favorito y conoce sus estadísticas.</p>

      <div className="pokemon-search">
        <input
          type="text"
          placeholder="Escribe un Pokemon"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="pokemon-input"
        />
        <button onClick={buscarPokemon} className="pokemon-boton">Buscar</button>
      </div>

      {pokemon && (
        <div className="pokemon-result">
          <h3>{pokemon.name}</h3>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
          <p>Altura: {pokemon.height / 10} m</p>
          <p>Peso: {pokemon.weight / 10} kg</p>
        </div>
      )}
    </section>
  );
};
