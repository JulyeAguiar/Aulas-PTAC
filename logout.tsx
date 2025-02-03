'use client';

import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Remove o token do cookie
    destroyCookie(undefined, 'restaurant-token');
    // Redireciona o usuário para a página de login
    router.push('/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
