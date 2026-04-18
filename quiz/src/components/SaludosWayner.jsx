import { useState } from 'react'
import './SaludosWayner.css'

export default function SaludosWayner() {
  const [name, setName] = useState('Wayner')

  return (
    <section className="saludo-container">
      <h2 className="saludo-titulo">¡Hola, {name}!</h2>
      <p className="saludo-texto">Este es un mensaje adicional que puedes mostrar en tu componente.</p>
      <button className="saludo-boton" onClick={() => setName(name === 'Alex' ? 'Wayner' : 'Alex')}>
        Cambiar nombre
      </button>
    </section>
  )
}
