import { useState} from 'react'

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
    <div>
      <h1>Buscar Pokemon</h1>
      <input
        type="text"
        placeholder="Escribe un Pokemon"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <button onClick={buscarPokemon}>Buscar</button>

      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Altura: {pokemon.height}</p>
            <p>Peso: {pokemon.weight}</p>
        </div>
      )}
    </div>
    );
};