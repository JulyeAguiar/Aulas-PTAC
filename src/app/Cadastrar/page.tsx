
'use client'
import { useState, useEffect, FormEvent } from "react"
import Usuario from "../../../interfaces/usuario"
import { ApiURL } from "../../../config"
import { useRouter } from "next/navigation"
import Navbar from "../../../componentes/navbar"
import Titulo from "../../../componentes/titulo"
import Logout from "../../../componentes/logout"

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
        const { erro, mensagem } = data

        console.log(data)

        if (erro) {
          setError(mensagem)
        }
        else{
          alert("Cadastro realizado com sucesso")
          router.push('/login')
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
    <div>
      <Navbar titulo="Pastiamo"/>

    <div className="container">
          <form onSubmit={handleSubmit}>
      <div className="formulario">
<Logout/>
        <Titulo titulo="Cadastro" />

        <label htmlFor="nome" className="caixaInfo">Nome:</label>
        <input id="nome" type="text" value={nome} onChange={(e) => alterar_Nome(e.target.value)} className="input" />

        <label htmlFor="email" className="caixaInfo">Email:</label>
        <input id="email" type="text" value={email} onChange={(e) => alterar_Email(e.target.value)} className="input" />

        <label htmlFor="senha" className="caixaInfo">Senha:</label>
        <input id="senha" type="password" value={senha} onChange={(e) => alterar_Senha(e.target.value)} className="input" />

        <button className="botao" onSubmit={handleSubmit}>Cadastrar</button>

        <a href="/login">Fazer login</a>
        {error && <p>{error}</p>}

      </div>
</form>
    </div>
    </div>
  )
}
export default Cadastrar

