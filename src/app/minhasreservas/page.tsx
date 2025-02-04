'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { ApiURL } from '../../../config';
import Navbar from '../../../componentes/navbar';
import Titulo from '../../../componentes/titulo';
import Reserva from '../../../interfaces/reserva';
import styles from '../../../css/mesas.module.css';

const MinhasReservas = () => {
    const router = useRouter();
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Hook para verificar o token e carregar as reservas
    useEffect(() => {
        const { 'restaurant-token': token } = parseCookies();

        if (!token) {
            router.push('/login');
            return;
        }

        const fetchReservas = async () => {
            try {
                const response = await fetch(`${ApiURL}/reservas`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        setError('Sessão expirada. Faça login novamente.');
                        router.push('/login');
                    } else {
                        throw new Error('Erro ao buscar as reservas');
                    }
                }

                const data = await response.json();

                if (data.erro) {
                    setError(data.mensagem);
                } else {
                    setReservas(data.reservas); // Atualiza as reservas
                }
            } catch (err) {
                setError('Erro ao carregar as reservas. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchReservas();
    }, [router]);

    // Função para cancelar (deletar) uma reserva
    const cancelarReserva = async (id: number) => {
        try {
            const { 'restaurant-token': token } = parseCookies();
            const response = await fetch(`${ApiURL}/reservas`, {
                method: 'DELETE', // Deletando a reserva
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ reservaId: id }), // Passando o ID da reserva para o backend
            });

            const data = await response.json();

            if (data.erro) {
                setError(data.mensagem);
            } else {
                // Atualiza a lista de reservas após o cancelamento
                setReservas((prevReservas) =>
                    prevReservas.filter((reserva) => reserva.id !== id)
                );
            }
        } catch (err) {
            console.error('Erro ao cancelar a reserva:', err);
            setError('Erro ao cancelar a reserva. Tente novamente mais tarde.');
        }
    };

    return (
        <div className={styles.container}>
            <Navbar titulo="Minhas Reservas" />
            <div className={styles.content}>
                <Titulo titulo="Minhas Reservas" />
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.grid}>
                    {loading ? (
                        <p>Carregando...</p> // Exibe mensagem enquanto as reservas estão sendo carregadas
                    ) : reservas.length === 0 ? (
                        <p>Nenhuma reserva encontrada.</p>
                    ) : (
                        reservas.map((reserva) => (
                            <div key={reserva.id} className={styles.mesa}>
                                <h3 className={styles.mesaTitle}>Reserva {reserva.mesa_id}</h3>
                                <p className={styles.mesaInfo}>
                                    Número de pessoas: {reserva.n_pessoas} | Data: {new Date(reserva.data).toLocaleString()}
                                </p>
                                {reserva.status && (
                                    <button
                                        onClick={() => cancelarReserva(reserva.id)} // Aqui a reserva será excluída
                                        className={styles.botaoCancelar}
                                    >
                                        Cancelar Reserva
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default MinhasReservas;
