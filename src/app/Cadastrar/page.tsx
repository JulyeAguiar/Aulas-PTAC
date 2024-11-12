
'use client'
import { useState, useEffect, FormEvent } from "react"
import Usuario from "../../../interfaces/usuario"
import { setCookie, parseCookies } from 'nookies'
import { ApiURL } from "../../../config"
import { useRouter } from "next/navigation"

const Cadastrar = () => {
  const [nome, setNome] = useState<string>()
  const [senha, setSenha] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [error, setError] = useState("");
  const router = useRouter()
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {

      const response = await fetch(`${ApiURL}/auth/cadastro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      })

      if (response) {

        const data = await response.json();
        const { erro, mensagem }= data

        console.log(data)

        if (erro) {
          setError(mensagem)
          console.log("tá errado aqui zé")
        }
        else{
          router.push('/cadastrar')
        }
        
      }
    } catch (error) {
      console.error('Erro na requisicao', error)
    }

    console.log('Email:', email);
    console.log('Senha:', senha);
    console.log('Nome:', nome);
  };

  return (

    <div className="register-container">
          <form onSubmit={handleSubmit}>
      <div className="register-form">

        <h1 className="register-title">Cadastrar</h1>

        <label htmlFor="nome" className="register-label">Nome:</label>
        <input id="nome" type="text" value={nome} onChange={(e) => alterar_Nome(e.target.value)} className="register-input" />

        <label htmlFor="email" className="register-label">Email:</label>
        <input id="email" type="text" value={email} onChange={(e) => alterar_Email(e.target.value)} className="register-input" />

        <label htmlFor="senha" className="register-label">Senha:</label>
        <input id="senha" type="password" value={senha} onChange={(e) => alterar_Senha(e.target.value)} className="register-input" />

        <button className="register-button" onSubmit={handleSubmit}>Cadastrar</button>

        <a href="/login">Fazer login</a>

      </div>
</form>
    </div>
  )
}
export default Cadastrar

