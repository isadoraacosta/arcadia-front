import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ResenhaCard from '../components/ResenhaCard';
import '../App.css';

function LivroAvaliacoes() {
  const { isbn } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { usuarioId, livro } = location.state || {};
  
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isbn && usuarioId) {
      fetchAvaliacoes();
    }
  }, [isbn, usuarioId]);

  const fetchAvaliacoes = async () => {
    try {
      const response = await fetch(`http://localhost:8080/livros/${isbn}/avaliacoes?usuarioId=${usuarioId}`);
      if (response.ok) {
        const data = await response.json();
        const sortedData = data.sort((a, b) => new Date(b.dataAvaliacao) - new Date(a.dataAvaliacao));
        setAvaliacoes(sortedData);
      }
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const handleUsuarioClick = (id) => {
    navigate(`/perfil/${id}`);
  };

  return (
    <Layout>
      <div className="hero-content" style={{ minHeight: 'auto', paddingTop: '40px' }}>
        <h1 className="dashboard-title" style={{ fontSize: '60px' }}>
          {livro?.titulo || 'Avaliações'}
        </h1>
        <h2 className="dashboard-subtitle">
          Minhas avaliações deste livro
        </h2>
        <div className="divider"></div>
      </div>

      <div className="form-scroll-container">
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
          {loading ? (
            <p style={{ textAlign: 'center', color: 'var(--cor-tinta)' }}>
              Carregando avaliações...
            </p>
          ) : avaliacoes.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--cor-tinta)' }}>
              Você ainda não avaliou este livro.
            </p>
          ) : (
            avaliacoes.map(avaliacao => (
              <ResenhaCard
                key={avaliacao.id}
                usuario={avaliacao.usuario?.nome || 'Usuário'}
                usuarioId={avaliacao.usuario?.id}
                foto={avaliacao.usuario?.foto || '/avatar-default.jpg'}
                livro={avaliacao.livro?.titulo || 'Livro'}
                nota={avaliacao.nota}
                data={formatarData(avaliacao.dataAvaliacao)}
                comentario={avaliacao.comentario}
                onUsuarioClick={handleUsuarioClick}
              />
            ))
          )}
          
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button 
              onClick={() => navigate(-1)}
              className="btn btn-outline"
              style={{ padding: '12px 30px' }}
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LivroAvaliacoes;
