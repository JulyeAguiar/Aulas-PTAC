'use client';

import { useState, useEffect } from 'react';
import { ApiURL } from '../../../config';
import Navbar from '../../../componentes/navbar';
import Titulo from '../../../componentes/titulo';
import Mesa from '../../../interfaces/mesa';
import styles from '../../../css/mesas.module.css';

const Mesas = () => {
    const [mesas, setMesas] = useState<Mesa[]>([]);
    const [filteredMesas, setFilteredMesas] = useState<Mesa[]>([]); // Mesas filtradas por data
    const [dataReserva, setDataReserva] = useState<string>(''); // Estado para armazenar a data da reserva
    const [error, setError] = useState<string | null>(null);

    // Função para buscar todas as mesas
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
                setMesas(data.mesas); // Armazena todas as mesas
                setFilteredMesas(data.mesas); // Inicialmente, todas as mesas estão disponíveis
            }
        } catch (err) {
            setError('Erro ao carregar as mesas. Tente novamente mais tarde.');
        }
    };

    // Função para buscar mesas filtradas por data
    const fetchMesasPorData = async (data: string) => {
        try {
            const response = await fetch(`${ApiURL}/mesa/disponibilidade?data=${data}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar as mesas disponíveis');
            }

            const dataJson = await response.json();
            if (dataJson.erro) {
                setError(dataJson.mensagem);
            } else {
                setFilteredMesas(dataJson.mesas); // Mesas filtradas pela data
            }
        } catch (err) {
            setError('Erro ao carregar as mesas disponíveis para a data selecionada. Tente novamente mais tarde.');
        }
    };

    // Função para lidar com a mudança de data no campo de input
    const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDataReserva(event.target.value);
    };

    // Função para aplicar o filtro de data
    const handleBuscarMesas = () => {
        if (!dataReserva) {
            setFilteredMesas(mesas); // Se não houver data selecionada, exibe todas as mesas
            setError(null);
            return;
        }

        fetchMesasPorData(dataReserva); // Caso haja data, busca as mesas para aquela data
    };

    // Carregar todas as mesas quando o componente for montado
    useEffect(() => {
        fetchMesas();
    }, []);

    return (
        <div className={styles.container}>
            <Navbar titulo="Pastiamo" />
            <div className={styles.content}>
                <Titulo titulo="Mesas Disponíveis" />
                {error && <p className={styles.error}>{error}</p>}

                {/* Filtro por Data */}
                <div className={styles.formulario}>
                    <label htmlFor="dataReserva" className={styles.label}>Data:</label>
                    <input
                        type="date"
                        value={dataReserva}
                        onChange={handleDataChange}
                        id="dataReserva"
                        className={styles.input}
                    />
                    <button onClick={handleBuscarMesas} className={styles.botaoFiltrar}>
                        Filtrar por Data
                    </button>
                </div>

                <div className={styles.grid}>
                    {filteredMesas.length === 0 ? (
                        <p className={styles.noResults}>Nenhuma mesa disponível para a data selecionada.</p>
                    ) : (
                        filteredMesas.map((mesa) => (
                            <div key={mesa.id} className={styles.mesa}>
                                <h3 className={styles.mesaTitle}>Mesa {mesa.codigo}</h3>
                                <p className={styles.mesaInfo}>Número de lugares: {mesa.n_lugares}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Mesas;
