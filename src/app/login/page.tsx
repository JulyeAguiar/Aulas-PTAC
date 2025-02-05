'use client'
import { useState, useEffect, FormEvent } from "react"
import { setCookie, parseCookies } from 'nookies'
import { useRouter } from "next/navigation"
import { ApiURL } from "../../../config"
import Titulo from "../../../componentes/titulo"
import Navbar from "../../../componentes/navbar"
import styles from "../../../css/forms.module.css"

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()

  useEffect(() => {
    const { 'restaurant-token': token } = parseCookies()
    if (token) {
      router.push('/mesas')
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
            maxAge: 60 * 60 * 1 // 1 hora
          })
          router.push('/mesas')
        }
      }
    } catch (error) {
      console.error('Erro na requisicao', error)
    }
  };

  return (
    <div className={styles.body}>
      <Navbar titulo="Pastiamo" />

      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.formulario}>
          <Titulo titulo="Login" />

          <label htmlFor="email" className={styles.caixaInfo}>Email:</label>
          <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} />

          <label htmlFor="senha" className={styles.caixaInfo}>Senha:</label>
          <input id="senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} />

          <button type="submit" className={styles.botao}>Login</button>

          <a href="/cadastrar" className={styles.link}>Crie uma conta</a>

          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login;
