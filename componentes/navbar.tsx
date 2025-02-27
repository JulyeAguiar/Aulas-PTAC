import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import { ApiURL } from '../config';
import Logout from "../componentes/logout";
import styles from "../css/navbar.module.css";

type NavProp = {
    titulo: string;
};

const Navbar: React.FC<NavProp> = () => {
    const [perfil, setPerfil] = useState<any>(null);
    const [isExpanded, setIsExpanded] = useState(false);  // Controla a expansão do menu
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchPerfil = async () => {
            const { 'restaurant-token': token } = parseCookies();

            if (!token) {
                setError('Usuário não autenticado. Faça login.');
                router.push('/login');
                return;
            }

            try {
                const response = await fetch(`${ApiURL}/perfil`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setPerfil(data.usuario);
                } else {
                    setError('Erro ao buscar perfil');
                }
            } catch (err) {
                setError('Erro ao carregar perfil.');
            }
        };

        fetchPerfil();
    }, [router]);

    const toggleMenu = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <nav className={styles.navbar}>
            <a href="/" className={styles.logo}>Pastiamo</a>

            <div className={styles.links}>
                <Logout />
                <a href="/cadastrar" className={styles.navLink}>Cadastrar</a>
                <a href="/login" className={styles.navLink}>Login</a>
                <button className={styles.menuButton} onClick={toggleMenu}>
                    {perfil ? `Olá, ${perfil.nome}` : 'Meu Perfil'}
                </button>
            </div>

            <div className={`${styles.menuSidebar} ${isExpanded ? styles.open : ''}`}>
                <button className={styles.closeButton} onClick={toggleMenu}>✖</button>

                {perfil ? (
                    <div className={styles.perfilInfo}>
                        <p><strong>Nome:</strong> {perfil.nome}</p>
                        <p><strong>Email:</strong> {perfil.email}</p>
                        <p><a href="/reservas" className={styles.navLink2}>Fazer reserva</a></p>
                        <p><a href="/minhasreservas" className={styles.navLink2}>Ver minhas reservas</a></p>
                        <p><a href="/mesas" className={styles.navLink2}>Ver Mesas disponíveis</a></p>
                        <p><a href="/perfil" className={styles.navLink2}>Alterar Meus Dados</a></p>
                        <p><a href="/reservageral" className={styles.navLink3}>Ver Reservas Gerais</a></p>
                        <p><a href="/cadastrarmesa" className={styles.navLink3}>Cadastro de Mesa</a></p>
                        <p><a href="/usuarios" className={styles.navLink3}>Listar Usuarios</a></p>
                    </div>
                ) : (
                    <p className={styles.error}>Usuário não autenticado</p>
                )}
            </div>

            {error && <p className={styles.error}>{error}</p>}
        </nav>
    );
};

export default Navbar;
