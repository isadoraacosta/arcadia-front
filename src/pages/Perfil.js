import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import '../App.css';

function Perfil() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [livrosLidos, setLivrosLidos] = useState([]);
  const [livrosLendo, setLivrosLendo] = useState([]);
  const [estatisticas, setEstatisticas] = useState({
    totalLivrosLidos: 0,
    totalPaginasLidas: 0
  });
  const [abaAtiva, setAbaAtiva] = useState('lidos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsuario();
    fetchLivrosUsuario();
    fetchEstatisticas();
  }, [id]);

  const fetchUsuario = async () => {
    if (!id) {
      console.error('ID do usuário não fornecido');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/usuarios/${id}`);
      if (response.ok) {
        const data = await response.json();
        setUsuario(data);
      } else {
        // Se falhar, tenta pegar do localStorage (para o próprio usuário logado)
        const dadosLocalStorage = localStorage.getItem('usuarioLogado');
        if (dadosLocalStorage) {
          const usuarioLocal = JSON.parse(dadosLocalStorage);
          if (usuarioLocal && usuarioLocal.id && usuarioLocal.id.toString() === id.toString()) {
            setUsuario(usuarioLocal);
          }
        }
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      // Fallback para localStorage
      const dadosLocalStorage = localStorage.getItem('usuarioLogado');
      if (dadosLocalStorage) {
        try {
          const usuarioLocal = JSON.parse(dadosLocalStorage);
          if (usuarioLocal && usuarioLocal.id && usuarioLocal.id.toString() === id.toString()) {
            setUsuario(usuarioLocal);
          }
        } catch (parseError) {
          console.error('Erro ao parsear dados locais:', parseError);
        }
      }
    }
  };

  const fetchLivrosUsuario = async () => {
    try {
      const response = await fetch(`http://localhost:8080/usuarios/${id}/livros`);
      if (response.ok) {
        const data = await response.json();
        const lidos = data.filter(item => item.status === 'lido');
        const lendo = data.filter(item => item.status === 'lendo');
        setLivrosLidos(lidos);
        setLivrosLendo(lendo);
      }
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEstatisticas = async () => {
    try {
      const response = await fetch(`http://localhost:8080/usuarios/${id}/estatisticas`);
      if (response.ok) {
        const data = await response.json();
        setEstatisticas(data);
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    }
  };

  const handleLivroClick = (livro) => {
    navigate(`/livro/${livro.isbn}/avaliacoes`, { 
      state: { usuarioId: id, livro } 
    });
  };

  if (loading) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '50px', color: 'var(--cor-tinta)' }}>
          <p>Carregando perfil...</p>
        </div>
      </Layout>
    );
  }

  if (!usuario) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '50px', color: 'var(--cor-tinta)' }}>
          <p>Usuário não encontrado.</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="btn btn-explore"
            style={{ marginTop: '20px' }}
          >
            Voltar ao Dashboard
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="perfil-container">
        <div className="perfil-header">
          <div className="perfil-info">
            <img 
              src={usuario.foto || '/avatar-default.jpg'} 
              alt={usuario.nome}
              className="perfil-foto"
            />
            <div className="perfil-dados">
              <h1 className="perfil-nome">{usuario.nome}</h1>
              <p className="perfil-bio">{usuario.bio || 'Amante de livros e histórias'}</p>
            </div>
          </div>

          <div className="perfil-estatisticas">
            <div className="stat-card">
              <div className="stat-numero">{estatisticas.totalLivrosLidos}</div>
              <div className="stat-label">Livros Lidos</div>
            </div>
            <div className="stat-card">
              <div className="stat-numero">{estatisticas.totalPaginasLidas}</div>
              <div className="stat-label">Páginas Lidas</div>
            </div>
          </div>
        </div>

        <div className="perfil-tabs">
          <button 
            className={`tab-button ${abaAtiva === 'lidos' ? 'active' : ''}`}
            onClick={() => setAbaAtiva('lidos')}
          >
            Minhas Leituras ({livrosLidos.length})
          </button>
          <button 
            className={`tab-button ${abaAtiva === 'lendo' ? 'active' : ''}`}
            onClick={() => setAbaAtiva('lendo')}
          >
            Lendo Atualmente ({livrosLendo.length})
          </button>
        </div>

        <div className="perfil-conteudo">
          {abaAtiva === 'lidos' && (
            <div className="livros-grid">
              {livrosLidos.length === 0 ? (
                <p className="mensagem-vazia">Nenhum livro lido ainda.</p>
              ) : (
                livrosLidos.map(item => (
                  <div 
                    key={item.livro.isbn} 
                    className="livro-card"
                    onClick={() => handleLivroClick(item.livro)}
                  >
                    <img 
                      src={item.livro.imagem || '/book-placeholder.jpg'} 
                      alt={item.livro.titulo}
                      className="livro-capa"
                    />
                    <div className="livro-info">
                      <h3 className="livro-titulo">{item.livro.titulo}</h3>
                      <p className="livro-autor">{item.livro.autor}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {abaAtiva === 'lendo' && (
            <div className="livros-grid">
              {livrosLendo.length === 0 ? (
                <p className="mensagem-vazia">Nenhum livro sendo lido no momento.</p>
              ) : (
                livrosLendo.map(item => (
                  <div 
                    key={item.livro.isbn} 
                    className="livro-card"
                    onClick={() => handleLivroClick(item.livro)}
                  >
                    <img 
                      src={item.livro.imagem || '/book-placeholder.jpg'} 
                      alt={item.livro.titulo}
                      className="livro-capa"
                    />
                    <div className="livro-info">
                      <h3 className="livro-titulo">{item.livro.titulo}</h3>
                      <p className="livro-autor">{item.livro.autor}</p>
                      {item.progresso && (
                        <div className="livro-progresso">
                          <div className="progresso-barra">
                            <div 
                              className="progresso-preenchido"
                              style={{ width: `${item.progresso}%` }}
                            ></div>
                          </div>
                          <span className="progresso-texto">{item.progresso}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Perfil;
