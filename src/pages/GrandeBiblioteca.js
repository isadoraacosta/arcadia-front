import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutLogado from '../components/LayoutLogado';
import '../App.css';
import imagemPadrao from '../assets/capa-livro.jpg';

const GrandeBiblioteca = () => {
  const navigate = useNavigate();

  const [livros, setLivros] = useState([]);
  const [livrosFiltrados, setLivrosFiltrados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState('');
  const [filtroGenero, setFiltroGenero] = useState('');

  useEffect(() => {
    carregarTodosLivros();
  }, []);

  useEffect(() => {
    filtrarLivros();
  }, [busca, filtroGenero, livros]);

  const carregarTodosLivros = async () => {
    try {
      const response = await fetch('http://localhost:8080/livros');
      
      if (response.ok) {
        const data = await response.json();
        setLivros(data);
        setLivrosFiltrados(data);
      } else {
        throw new Error('Erro ao buscar livros');
      }
    } catch (error) {
      console.error('Erro ao carregar livros:', error);
    } finally {
      setCarregando(false);
    }
  };

  const filtrarLivros = () => {
    let resultado = [...livros];

    if (busca) {
      resultado = resultado.filter(livro =>
        livro.titulo?.toLowerCase().includes(busca.toLowerCase()) ||
        livro.autor?.toLowerCase().includes(busca.toLowerCase()) ||
        livro.usuario?.nome?.toLowerCase().includes(busca.toLowerCase())
      );
    }

    if (filtroGenero) {
      resultado = resultado.filter(livro => livro.genero === filtroGenero);
    }

    setLivrosFiltrados(resultado);
  };

  const generos = [...new Set(livros.map(l => l.genero).filter(Boolean))];

  return (
    <LayoutLogado>
      <div className="hero-content" style={{ minHeight: 'auto', paddingTop: '40px' }}>
        <h1 className="dashboard-title" style={{ fontSize: '80px', fontFamily: 'Cinzel, serif' }}>
          Grande Biblioteca
        </h1>
        <h2 className="dashboard-subtitle">
          Acervo Completo de Arcádia
        </h2>
        <div className="divider"></div>
        <p className="dashboard-welcome" style={{ fontSize: '18px', marginTop: '10px', marginBottom: '10px' }}>
          "Uma biblioteca é um templo onde dormem os deuses vivos chamados livros."
        </p>
      </div>

      <div className="perfil-container">
        <div className="filtros-biblioteca" style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '2rem', 
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <input
            type="text"
            placeholder="Buscar por título, autor ou usuário..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              flex: '1',
              minWidth: '300px',
              maxWidth: '500px',
              padding: '12px 20px',
              border: '2px solid #c9a961',
              borderRadius: '8px',
              fontSize: '16px',
              fontFamily: 'Crimson Text, serif',
              backgroundColor: '#fff9e6'
            }}
          />
          
          <select
            value={filtroGenero}
            onChange={(e) => setFiltroGenero(e.target.value)}
            style={{
              padding: '12px 20px',
              border: '2px solid #c9a961',
              borderRadius: '8px',
              fontSize: '16px',
              fontFamily: 'Crimson Text, serif',
              backgroundColor: '#fff9e6',
              cursor: 'pointer',
              minWidth: '200px'
            }}
          >
            <option value="">Todos os gêneros</option>
            {generos.map(genero => (
              <option key={genero} value={genero}>{genero}</option>
            ))}
          </select>

          <span style={{ 
            display: 'flex', 
            alignItems: 'center', 
            fontFamily: 'Cinzel, serif',
            fontSize: '16px',
            color: '#452f02',
            fontWeight: '600',
            padding: '0 1rem'
          }}>
            {livrosFiltrados.length} obra(s) encontrada(s)
          </span>
        </div>

        {carregando ? (
          <div style={{ textAlign: 'center', fontFamily: 'Cinzel, serif', fontSize: '24px', color: '#452f02' }}>
            Consultando os arquivos...
          </div>
        ) : (
          <div className="livros-grid">
            {livrosFiltrados.length === 0 ? (
              <div className="mensagem-vazia" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                <p style={{ fontFamily: 'Crimson Text, serif', fontSize: '22px', fontStyle: 'italic', color: '#5e4003' }}>
                  {busca || filtroGenero 
                    ? 'Nenhum livro encontrado com esses filtros.'
                    : 'Ainda não há livros catalogados na Grande Biblioteca.'}
                </p>
              </div>
            ) : (
              livrosFiltrados.map((livro) => (
                <div key={livro.id} className="livro-card">
                  <div className="livro-capa">
                    <img 
                      src={imagemPadrao} 
                      alt={livro.titulo} 
                    />
                  </div>
                  
                  <div className="livro-info">
                    <h3 className="livro-titulo" title={livro.titulo}>
                      {livro.titulo}
                    </h3>
                    <p className="livro-autor">
                      {livro.autor}
                    </p>
                    
                    <div className="livro-meta">
                      <span>{livro.genero || 'Gênero n/a'}</span>
                      <span>{livro.ano > 0 ? livro.ano : ''}</span>
                    </div>
                    
                    {livro.usuario && (
                      <div style={{ 
                        marginTop: '10px', 
                        paddingTop: '10px', 
                        borderTop: '1px solid #e6d5a8',
                        fontSize: '14px',
                        color: '#7a5d1e',
                        fontStyle: 'italic'
                      }}>
                        📚 Biblioteca de: {livro.usuario.nome}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </LayoutLogado>
  );
};

export default GrandeBiblioteca;
