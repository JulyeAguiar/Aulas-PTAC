'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState(true)
  const route = useRouter()
  if (user) {
    return (
      <div className={styles.page}>
        <h1>Logins</h1>
        <h2>e-mail</h2>
        <input></input>
        <h2>senha</h2>
        <input></input>
        <button onClick={() =>
          setUser(false)}>Fazer login
        </button>
        {/* <button onClick={() => route.push('/login')}>Butão</button> */}
      </div>
    );
  }
  else {
    return (
      <div className={styles.page}>
        <h1>Erro ao realizar o login</h1>
        <button onClick={() =>
          setUser(true)}>Voltar para a pagina inicial
        </button>
      </div>
    );
  }

}
