'use client';

import { useState, useEffect, FormEvent } from 'react';
import { ApiURL } from '../../../config';
import Navbar from '../../../componentes/navbar';
import Titulo from '../../../componentes/titulo';
import Mesa from '../../../interfaces/mesa';
import styles from '../../../css/mesas.module.css';
import { parseCookies } from 'nookies';

const ReservarMesas = () => {
  const [mesas, setMesas] = useState<Mesa[]>([]); 
  const [selectedMesa, setSelectedMesa] = useState<Mesa | null>(null);
  const [nPessoas, setNPessoas] = useState<number | string>(''); 
  const [dataReserva, setDataReserva] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState<string>(''); 

  // Função para buscar as mesas disponíveis 
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
        setError(data.mensagem); // Mostra erro se a API retornar erro
      } else {
        setMesas(data.mesas || []); // Atribui as mesas retornadas pela API
      }
    } catch (err) {
      setError('Erro ao carregar as mesas. Tente novamente mais tarde.');
    }
  };

  useEffect(() => {
    fetchMesas(); // Chama a função de busca de mesas quando o componente é montado
  }, []);

  const handleReserva = async (e: FormEvent) => {
    e.preventDefault();
    const { 'restaurant-token': token } = parseCookies(); 

    const numeroDePessoas = Number(nPessoas); // Converte o número de pessoas para número

    // Verifica se o número de pessoas é válido
    if (isNaN(numeroDePessoas)) {
      setError('Por favor, insira um número válido para o número de pessoas');
      return;
    }

    if (!selectedMesa) {
      setError('Selecione uma mesa');
      return;
    }

    if (!dataReserva) {
      setError('Por favor, selecione uma data para a reserva');
      return;
    }

    if (numeroDePessoas > selectedMesa.n_lugares) {
      setError(`O número de pessoas excede a capacidade da mesa (máximo: ${selectedMesa.n_lugares})`);
      return;
    }

    try {
      // Envia a reserva via API
      const response = await fetch(`${ApiURL}/reservas/novo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          mesaId: selectedMesa.id,
          n_pessoas: numeroDePessoas,
          data: dataReserva, // Envia a data selecionada
        }),
      });

      const data = await response.json();

      if (data.erro) {
        setError(data.mensagem); 
      } else {
        //limpa os campos
        setMensagem('Reserva realizada com sucesso!');
        setError(null); 
        setSelectedMesa(null); 
        setNPessoas(''); 
        setDataReserva(''); 
        setTimeout(() => setMensagem(''), 3000);
      }
    } catch (err) {
      setError('Erro ao realizar a reserva. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <Navbar titulo="Pastiamo" />
        <div className={styles.content}>
          <Titulo titulo="Reservar Mesa" />
          {error && <p className={styles.error}>{error}</p>}
          {mensagem && <p className={styles.success}>{mensagem}</p>}

          <div className={styles.grid}>
            {mesas.map((mesa) => (
              <div
                key={mesa.id}
                className={`${styles.mesa} ${selectedMesa?.id === mesa.id ? styles.selected : ''}`}
                onClick={() => setSelectedMesa(mesa)} // Seleciona a mesa ao clicar
              >
                <h3 className={styles.mesaTitle}>Mesa {mesa.codigo}</h3>
                <p className={styles.mesaInfo}>Número de lugares: {mesa.n_lugares}</p>
              </div>
            ))}
          </div>

          {selectedMesa && (
            <div className={styles.form}>
              <h3>Informações da Mesa {selectedMesa.codigo}</h3>
              <form onSubmit={handleReserva}>
                <label htmlFor="nPessoas">Número de Pessoas:</label>
                <input id="nPessoas" type="number" value={nPessoas} onChange={(e) => setNPessoas(e.target.value)} min="1" max={selectedMesa.n_lugares} required />

                <label htmlFor="dataReserva">Data da Reserva:</label>
                <input id="dataReserva" type="date" value={dataReserva} onChange={(e) => setDataReserva(e.target.value)} required />
                <button type="submit">Confirmar Reserva</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservarMesas;
