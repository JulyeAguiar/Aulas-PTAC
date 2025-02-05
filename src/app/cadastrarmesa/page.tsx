'use client'
import { useState, useEffect } from "react"
import { parseCookies } from 'nookies'
import { useRouter } from "next/navigation"
import Navbar from "../../../componentes/navbar"
import Titulo from "../../../componentes/titulo"
import { ApiURL } from "../../../config"
import styles from "../../../css/forms.module.css"

const CadastrarMesa = () => {
  const [codigo, setCodigo] = useState<string>("")
  const [nLugares, setNLugares] = useState<string>("")
  const [mensagem, setMensagem] = useState<string>("")
  const [erro, setErro] = useState<boolean>(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const router = useRouter()

  // Verificar se otoken existe, se não, redirecionar para o login
  useEffect(() => {
    const { 'restaurant-token': token } = parseCookies()
    if (!token) {
      router.push('/login') // Redireciona para login se não houver token
      return
    }

    // Função para verificar se é adm
    const fetchPerfil = async () => {
      try {
        const perfilResponse = await fetch(`${ApiURL}/perfil`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!perfilResponse.ok) {
          setErro(true);
          setMensagem("Erro ao obter perfil.");
          return;
        }
    
        const perfilData = await perfilResponse.json();
        setUserRole(perfilData.usuario.tipo);
    
        if (perfilData.usuario.tipo !== 'adm') {
          console.log(perfilData.usuario.tipo)
          alert('Você não tem permissão para acessar essa página!');
          router.push('/mesas');  // Redireciona para a página de mesas caso não seja adm
        }
      } catch (error) {
        console.error('Erro ao buscar perfil', error);
        setErro(true);
        setMensagem("Erro ao obter perfil. Tente novamente.");
      }
    }

    fetchPerfil()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { 'restaurant-token': token } = parseCookies() // pega o token

    if (!token) {
      setErro(true)
      setMensagem("Você não tem permissão para cadastrar uma mesa.")
      return
    }

    try {
      const response = await fetch(`${ApiURL}/mesa/novo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // manda o token p/ o cabeçalho
        },
        body: JSON.stringify({ codigo, n_lugares: Number(nLugares) })
      })

      const data = await response.json()
      setErro(data.erro)
      setMensagem(data.mensagem)

      if (!data.erro) {
        alert("Mesa cadastrada com sucesso")
        //  redirecionar para a lista de mesas quando cadastrar
        router.push('/admin/mesas')
      }
    } catch (error) {
      console.error('Erro na requisição', error)
      setErro(true)
      setMensagem("Erro ao cadastrar a mesa. Tente novamente.")
    }
  }

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <Navbar titulo="Pastiamo" />
        <div className={styles.content}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formulario}>
              <Titulo titulo="Cadastro de Mesa" />
              <label htmlFor="codigo" className={styles.label}>Código:</label>
              <input id="codigo" type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} className={styles.input} maxLength={3} required/>

              <label htmlFor="nLugares" className={styles.label}>Número de Lugares:</label>
              <input id="nLugares" type="number" value={nLugares} onChange={(e) => setNLugares(e.target.value)} className={styles.input} min={1} max={10} required/>

              <button className={styles.botao} type="submit">Cadastrar Mesa</button>
              {mensagem && <p className={erro ? styles.erro : styles.sucesso}>{mensagem}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CadastrarMesa
