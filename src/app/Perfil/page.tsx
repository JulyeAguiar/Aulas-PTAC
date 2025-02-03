'use client';

import { useState, FormEvent, useEffect } from 'react';
import { ApiURL } from '../../../config';
import Navbar from '../../../componentes/navbar';
import Titulo from '../../../componentes/titulo';

const Perfil = () => {
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    senha: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Função para obter os dados do usuário
    const fetchPerfil = async () => {
      try {
        const response = await fetch(`${ApiURL}/perfil`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Erro ao carregar perfil');
        }

        const data = await response.json();
        setUsuario(data.usuario);
      } catch (err) {
        setError('Erro ao carregar perfil.');
      }
    };

    fetchPerfil();
  }, []);

  const handlePerfilSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${ApiURL}/perfil`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
      });

      const dataResponse = await response.json();
      if (dataResponse.erro) {
        setError(dataResponse.mensagem);
      } else {
        alert('Perfil atualizado com sucesso!');
      }
    } catch (err) {
      setError('Erro ao atualizar perfil. Tente novamente.');
    }
  };

  return (
    <div>
      <Navbar titulo="Pastiamo" />
      <div className="container">
        <Titulo titulo="Meu Perfil" />
        {error && <p className="erro">{error}</p>}

        <form onSubmit={handlePerfilSubmit}>
          <label htmlFor="nome">Nome:</label>
          <input
            id="nome"
            type="text"
            value={usuario.nome}
            onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
          />

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={usuario.email}
            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
          />

          <label htmlFor="senha">Senha:</label>
          <input
            id="senha"
            type="password"
            value={usuario.senha}
            onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
          />

          <button type="submit">Atualizar Perfil</button>
        </form>
      </div>
    </div>
  );
};

export default Perfil;
