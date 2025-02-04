'use client';

import { useState, useEffect } from 'react';
const { parseCookies } = require("nookies");
import { ApiURL } from '../../../config';
import Navbar from '../../../componentes/navbar';
import Titulo from '../../../componentes/titulo';
import Reserva from '../../../interfaces/reserva';
import styles from '../../../css/mesas.module.css';


const MinhasReservas = () => {
    const [reservas, setReservas] = useState<Reserva[]>([]); // Estado para armazenar as reservas
    const [error, setError] = useState<string | null>(null); // Estado para mensagens de erro

    // Função para buscar as reservas do usuário
    const fetchReservas = async () => {
        try {
            const response = await fetch(`${ApiURL}/reservas`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${parseCookies().token}`, // Exemplo de como pegar o token
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar as reservas');
            }

            const data = await response.json();
            if (data.erro) {
                setError(data.mensagem);
            } else {
                setReservas(data.reservas);
            }
        } catch (err) {
            setError('Erro ao carregar as reservas. Tente novamente mais tarde.');
        }
    };

    useEffect(() => {
        fetchReservas();
    }, []);

    return (
        <div className={styles.container}>
            <Navbar titulo="Minhas Reservas" />
            <div className={styles.content}>
                <Titulo titulo="Minhas Reservas" />
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.grid}>
                    {reservas.map((reserva) => (
                        <div key={reserva.id} className={styles.mesa}>
                            <h3 className={styles.mesaTitle}>Reserva {reserva.mesa_id}</h3>
                            <p className={styles.mesaInfo}>
                                Número de pessoas: {reserva.n_pessoas} | Data: {new Date(reserva.data).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MinhasReservas;
