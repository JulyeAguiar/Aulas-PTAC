'use client';

import { useState, useEffect } from 'react'
import { ApiURL } from '../../../config'
import Navbar from '../../../componentes/navbar'
import Titulo from '../../../componentes/titulo'
import Mesa from '../../../interfaces/mesa'
import styles from '../../../css/mesas.module.css'

const Mesas = () => {
    const [mesas, setMesas] = useState<Mesa[]>([])
    const [filteredMesas, setFilteredMesas] = useState<Mesa[]>([])
    const [dataReserva, setDataReserva] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

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

    // Função para buscar mesas por data
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
                setFilteredMesas(dataJson.mesas);
            }
        } catch (err) {
            setError('Erro ao carregar as mesas');
        }
    };

    // Função para resolver o problema com a data do inpurt
    const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDataReserva(event.target.value);
    };

    // Função para aplicar o filtro de data
    const handleBuscarMesas = () => {
        if (!dataReserva) {
            setFilteredMesas(mesas);
            setError(null);
            return;
        }
        fetchMesasPorData(dataReserva); // Caso haja data, busca as mesas para aquela data
    };

    // Carregar todas as mesas quando montar o componente
    useEffect(() => {
        fetchMesas();
    }, []);
    //Componente
    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <Navbar titulo="Pastiamo" />
                <div className={styles.content}>
                    <Titulo titulo="Mesas Disponíveis" />
                    {error && <p className={styles.error}>{error}</p>}


                    <div className={styles.formulario}>
                        <label htmlFor="dataReserva" className={styles.label}>Data:</label>
                        <input type="date" value={dataReserva} onChange={handleDataChange} id="dataReserva" className={styles.input} />
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
        </div>
    );
};

export default Mesas;
