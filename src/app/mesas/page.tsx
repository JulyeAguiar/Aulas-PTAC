'use client';

import { useState, useEffect } from 'react';
import { ApiURL } from '../../../config';
import Navbar from '../../../componentes/navbar';
import Titulo from '../../../componentes/titulo';
import Mesa from '../../../interfaces/mesa';
import styles from '../../../css/mesas.module.css';


const Mesas = () => {
    const [mesas, setMesas] = useState<Mesa[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Função para buscar as mesas de PTAS
    const fetchMesas = async () => {
        try {
            const response = await fetch(`${ApiURL}/mesa`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar as mesas');
            }

            const data = await response.json();
            if (data.erro) {
                setError(data.mensagem);
            } else {
                setMesas(data.mesas);
            }
        } catch (err) {
            setError('Erro ao carregar as mesas. Tente novamente mais tarde.');
        }
    };

    useEffect(() => {
        fetchMesas();
    }, []);

    

    return (
        <div className={styles.container}>
            <Navbar titulo="Pastiamo" />
            <div className={styles.content}>
                <Titulo titulo="Mesas Disponíveis" />
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.grid}>
                    {mesas.map((mesa) => (
                        <div key={mesa.id} className={styles.mesa}>
                            <h3 className={styles.mesaTitle}>Mesa {mesa.codigo}</h3>
                            <p className={styles.mesaInfo}>Número de lugares: {mesa.n_lugares}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Mesas;
