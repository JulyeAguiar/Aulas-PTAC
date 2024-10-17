'use client'  

import { useRouter } from 'next/navigation'  

export default function Login() {
  const router = useRouter()  

  return (
    <div>
      <h1>Login</h1>
      <p onClick={() => router.push('/Cadastrar')}>Criar novo Cadastro</p>
    </div>
  )
}
