'use client'
import { destroyCookie } from 'nookies'
import { useRouter } from 'next/navigation'
import  styles  from "../css/navbar.module.css"

const Logout = () => {
  const router = useRouter()

  // Função de logout
  const handleLogout = () => {
    // Remove o token dos cookies
    destroyCookie(undefined, 'restaurant-token')

    // Redireciona para a página de login após logout
    router.push('/login')
  }

  return (

        <button className={styles.logoutButton} onClick={handleLogout}>Deslogar</button>

  )
}

export default Logout
