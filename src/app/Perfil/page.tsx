'use client';
import { useState, useEffect, FormEvent } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import { ApiURL } from '../../../config';
import styles from "../../../css/forms.module.css";
import Navbar from '../../../componentes/navbar';

const Perfil = () => {
  const [perfil, setPerfil] = useState<any>(null);
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Verificar perfil e autenticação
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
          setNome(data.usuario.nome);
          setEmail(data.usuario.email);
        } else {
          setError('Erro ao buscar perfil');
        }
      } catch (err) {
        setError('Erro ao carregar perfil.');
      }
    };

    fetchPerfil();
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { 'restaurant-token': token } = parseCookies();

    try {
      const response = await fetch(`${ApiURL}/perfil`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (response.ok) {
        alert('Perfil atualizado com sucesso!');
        setPerfil({ nome, email }); // Atualiza os dados no frontend
      } else {
        const data = await response.json();
        setError(data.mensagem || 'Erro ao atualizar perfil');
      }
    } catch (err) {
      setError('Erro ao atualizar perfil.');
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <Navbar titulo="Pastiamo" />
        <h2>Perfil</h2>
        {perfil ? (
          <form onSubmit={handleSubmit} className={styles.formulario}>
            <div className={styles.inputContainer}>
              <label htmlFor="nome" className={styles.label}>Nome:</label>
              <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} className={styles.input} required />
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="email" className={styles.label}>Email:</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} required />
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="senha" className={styles.label}>Senha:</label>
              <input id="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} className={styles.input} />
            </div>

            <button className={styles.botao} type="submit">Atualizar Perfil</button>
          </form>
        ) : (
          <p>Carregando perfil...</p>
        )}
      </div>
    </div>
  );
};

export default Perfil;
