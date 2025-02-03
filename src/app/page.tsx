
'use client'

import Usuario from "../../interfaces/usuario"
import Mesa from "../../interfaces/mesa"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"


const Perfil = () => {

  const [mesas, setMesas] = useState<Mesa[]>([])

  useEffect(() => {
    async function fetchData(){
    const response = await fetch('http://localhost:3000/reservas')
    const data = await response.json()
    setMesas(data.mesas)
    }
  fetchData()
  }, [])

  const [usuario, setUsuario] = useState<Usuario>({
    id: 1,
    nome: 'Josisvaldo da Silva',
    email: 'josilva@getMaxListeners.com',
    password: 'princesinhaguerreira',
    tipo: 'cliente'
  })

  const [mesa, setMesa] = useState<Mesa>({
    id: 1,
    codigo: '14421',
    n_lugares: 5

  })

  return (
    <div>
      <h1 className="titulo">Página Inicial</h1>
      <p>Mesa:{mesa.id}</p>
      <p>Lugares:{mesa.n_lugares}</p>

    </div>
  )
}
export default Perfil
