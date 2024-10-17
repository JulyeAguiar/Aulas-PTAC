
'use client'
import { useState } from "react"
import Usuario from "../../../interfaces/usuario"

const Cadastrar = () => {
    const [nome, setNome] = useState<string>()
    const [senha, setSenha] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [usuario, setUsuario] = useState<Usuario>({
        nome:'',
        email:'',
        password:''
    })
    
const alterar_Nome = (novoNome: string) => {
    setUsuario((valoresAnteriores) => ({
        ...valoresAnteriores,
        nome: novoNome
    }))
    console.log(usuario)
}

const alterar_Email = (novoEmail: string) => {
    setUsuario((valoresAnteriores) => ({
        ...valoresAnteriores,
        email: novoEmail
    }))
    console.log(usuario)
}

const alterar_Senha = (novaSenha: string) => {
    setUsuario((valoresAnteriores) => ({
        ...valoresAnteriores,
        password: novaSenha
    }))
    console.log(usuario)
}

  return (
    <div>
      <div>
        <h1>Cadastrar</h1>
        <p>Nome:</p>
        <input id="nome" type="text" value={nome} onChange={(e) => alterar_Nome(e.target.value)}></input>

        <p>Email:</p>
        <input id="email" type="text" value={email} onChange={(e) => alterar_Email(e.target.value)}></input>

        <p>Senha:</p>
        <input id="senha" type="text" value={senha} onChange={(e) => alterar_Senha(e.target.value)}></input>

        <button >Cadastrar</button>

      </div>
    </div>
  )
}
export default Cadastrar
