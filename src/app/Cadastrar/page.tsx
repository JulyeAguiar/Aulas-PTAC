
'use client'
import { useState } from "react"
import Usuario from "../../../interfaces/usuario"
import { setCookie, parseCookies } from 'nookies'

const Cadastrar = () => {
  const [nome, setNome] = useState<string>()
  const [senha, setSenha] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [usuario, setUsuario] = useState<Usuario>({
    nome: '',
    email: '',
    password: ''
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

    <div className="register-container">
      <div className="register-form">

        <h1 className="register-title">Cadastrar</h1>

        <label htmlFor="nome" className="register-label">Nome:</label>
        <input id="nome" type="text" value={nome} onChange={(e) => alterar_Nome(e.target.value)} className="register-input" />

        <label htmlFor="email" className="register-label">Email:</label>
        <input id="email" type="text" value={email} onChange={(e) => alterar_Email(e.target.value)} className="register-input" />

        <label htmlFor="senha" className="register-label">Senha:</label>
        <input id="senha" type="password" value={senha} onChange={(e) => alterar_Senha(e.target.value)} className="register-input" />

        <button className="register-button">Cadastrar</button>

      </div>
    </div>
  )
}
export default Cadastrar

