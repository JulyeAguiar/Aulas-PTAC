'use client'
import { destroyCookie } from 'nookies'
import { useRouter } from 'next/navigation'

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
    <div>
      <div className="container">
        <button onClick={handleLogout} className="botao">
          Deslogar
        </button>
      </div>
    </div>
  )
}

export default Logout
