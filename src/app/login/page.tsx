'use client'
import { useState, useEffect, FormEvent } from "react"
import { setCookie, parseCookies } from 'nookies'
import { useRouter } from "next/navigation"
import { ApiURL } from "../../../config"

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()

  useEffect(() => {
    const { 'restaurant-token': token } = parseCookies()
    if (token) {
      router.push('/')
    }
  }, [router])


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {

      const response = await fetch(`${ApiURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (response) {

        const data = await response.json();
        const { erro, mensagem, token } = data

        console.log(data)

        if (erro) {
          setError(mensagem)
        }
        else {
          setCookie(undefined, 'restaurant-token', token, {
            maxAge: 60 * 60 * 1 //1 hora
          })
          router.push('/')
        }
      }
    } catch (error) {
      console.error('Erro na requisicao', error)
    }

    console.log('Email:', email);
    console.log('Senha:', password);
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <div className="register-form">

          <h1 className="register-title">Login</h1>

          <label htmlFor="email" className="register-label">Email:</label>
          <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="register-input" />

          <label htmlFor="senha" className="register-label">Senha:</label>
          <input id="senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="register-input" />

          <button className="register-button" onSubmit={handleSubmit}>Login</button>

          <a href="/cadastrar">Crie uma conta</a>
          {error && <p>{error}</p>}
        </div>
      </form>
    </div>
  )
}
export default Login

