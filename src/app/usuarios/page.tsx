'use client';

import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import { ApiURL } from '../../../config';
import styles from "../../../css/mesas.module.css";
import Navbar from '../../../componentes/navbar';
import Titulo from '../../../componentes/titulo';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const verificarAutenticacao = async () => {
            const { 'restaurant-token': token } = parseCookies();

            if (!token) {
                setError('Usuário não autenticado. Faça login.');
                router.push('/login');
                return;
            }

            try {
                // Buscar perfil do usuário para verificar se é admin
                const perfilResponse = await fetch(`${ApiURL}/perfil`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!perfilResponse.ok) {
                    setError('Erro ao obter perfil.');
                    return;
                }

                const perfilData = await perfilResponse.json();
                setUserRole(perfilData.usuario.tipo);

                if (perfilData.usuario.tipo !== 'adm') {
                    alert('Você não tem permissão para acessar essa página!');
                    router.push('/mesas');
                    return;
                }

                // Buscar lista de usuários
                const response = await fetch(`${ApiURL}/perfil/todos`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsuarios(data.usuario);
                } else {
                    setError('Erro ao carregar usuários.');
                }
            } catch (err) {
                setError('Erro ao carregar usuários.');
            }
        };

        verificarAutenticacao();
    }, [router]);

    if (error) {
        return <p className={styles.error}>{error}</p>;
    }

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <Navbar titulo="Pastiamo" />
                <div className={styles.content}>
                    <Titulo titulo="Lista de Usuários" />
                    {error && <p className={styles.error}>{error}</p>}

                    <div className={styles.grid}>
                        {usuarios.length === 0 ? (
                            <p className={styles.noResults}>Nenhum usuário encontrado.</p>
                        ) : (
                            usuarios.map((usuario) => (
                                <div key={usuario.id} className={styles.mesa}>
                                    <h3 className={styles.mesaTitle}>{usuario.nome}</h3>
                                    <p className={styles.mesaInfo}>{usuario.email}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Usuarios;
