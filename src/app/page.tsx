
'use client'
import Usuario from "../../interfaces/usuario"
import Mesa from "../../interfaces/mesa"
import { useState } from "react"

const Perfil = () => {

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

      <div>
        <h1>Perfil Usuário</h1>
        <p>{usuario.nome}</p>
        <p>{usuario.email}</p>
        {/* <p>{usuario.password}</p> */}
        <p>{usuario.tipo}</p>
      </div>

      <div>
        <h1>Mesa</h1>
        <p>{mesa.codigo}</p>
        <p>{mesa.n_lugares}</p>
      </div>

    </div>
  )
}
export default Perfil
