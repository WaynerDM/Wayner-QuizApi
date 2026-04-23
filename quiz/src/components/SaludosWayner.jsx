import { useState } from 'react'
import './SaludosWayner.css'

export default function SaludosWayner() {
  console.log('SaludosWayner component rendered');
  const [name, setName] = useState('Wayner')

  return (
    <section className="saludo-container">
      <h2 className="saludo-page-title">Inicio</h2>
      <h1 className="saludo-titulo">¡Hola, {name}!</h1>
      <p className="saludo-texto">Este es un mensaje adicional que puedes mostrar en tu componente.</p>
      <button className="saludo-boton" onClick={() => setName(name === 'Alex' ? 'Wayner' : 'Alex')}>
        Cambiar nombre
      </button>
    </section>
  )
}
