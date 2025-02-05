'use client';

import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import { ApiURL } from '../../../config';
import Navbar from '../../../componentes/navbar';
import Titulo from '../../../componentes/titulo';
import styles from '../../../css/mesas.module.css';

interface Reserva {
  id: number;
  data: string;
  n_pessoas: number;
  usuario: { id: number; nome: string; email: string };
  mesa: { id: number; codigo: string; n_lugares: number };
}

const Reservas = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [filteredReservas, setFilteredReservas] = useState<Reserva[]>([]);
  const [dataFiltro, setDataFiltro] = useState<string>(''); 
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  // Verificar se o token existe
  useEffect(() => {
    const { 'restaurant-token': token } = parseCookies();
    if (!token) {
      router.push('/login'); 
    } else {
      fetchPerfil(token); 
    }
  }, [router]);

  // Função para verificar se é adm
  const fetchPerfil = async (token: string) => {
    try {
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
      } else {
        fetchReservas(token); 
      }
    } catch (error) {
      console.error('Erro ao buscar perfil', error);
      setError('Erro ao obter perfil. Tente novamente mais tarde.');
    }
  };

  // Função para buscar todas as reservas
  const fetchReservas = async (token: string) => {
    try {
      const response = await fetch(`${ApiURL}/reservas/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });

      const textResponse = await response.text();

      try {
        const data = JSON.parse(textResponse); 
        if (data.erro) {
          setError(data.mensagem);
        } else {
          setReservas(data.reservas); // Armazena todas as reservas
          setFilteredReservas(data.reservas); // mostra todas as reservas
        }
      } catch (error) {
        console.error('Erro ao tentar parsear JSON:', error);
        setError('Erro ao carregar as reservas. Tente novamente mais tarde.');
      }
    } catch (error) {
      setError('Erro ao carregar as reservas. Tente novamente mais tarde.');
    }
  };

  // Função para lidar com a mudança no campo de data
  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataFiltro(event.target.value); 
  };
  
  // Função para filtrar as reservas por data
  const handleFiltrarReservas = () => {
    if (!dataFiltro) {
      setFilteredReservas(reservas); // Se não houver data selecionada, exibe todas as reservas
    } else {
      const reservasFiltradas = reservas.filter((reserva) => {
        const reservaData = new Date(reserva.data).toLocaleDateString();
        const filtroData = new Date(dataFiltro).toLocaleDateString();
        return reservaData === filtroData; 
      });
      setFilteredReservas(reservasFiltradas); // Atualiza as reservas filtradas
    }
    setError(null); 
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <Navbar titulo="Pastiamo" />
        <div className={styles.content}>
          <Titulo titulo="Reservas" />
          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.filter}>
            <input type="date" value={dataFiltro} onChange={handleDataChange} className={styles.dateInput}/>
            <button onClick={handleFiltrarReservas} className={styles.botaoFiltrar}> Filtrar por Data</button>
          </div>

          <div className={styles.grid}>
            {filteredReservas.length === 0 ? (
              <p>Nenhuma reserva encontrada para a data selecionada.</p>
            ) : (
              filteredReservas.map((reserva) => (
                <div key={reserva.id} className={styles.mesa}>
                  <h3 className={styles.mesaTitle}>Reserva #{reserva.id}</h3>
                  <p className={styles.mesaInfo}>Mesa: {reserva.mesa.codigo}</p>
                  <p className={styles.mesaInfo}>Lugares: {reserva.mesa.n_lugares}</p>
                  <p className={styles.mesaInfo}>Pessoas: {reserva.n_pessoas}</p>
                  <p className={styles.mesaInfo}>Data: {new Date(reserva.data).toLocaleDateString()}</p>
                  <p className={styles.mesaInfo}>Cliente: {reserva.usuario.nome} ({reserva.usuario.email})</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservas;
