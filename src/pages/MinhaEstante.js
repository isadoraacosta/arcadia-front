import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutLogado from '../components/LayoutLogado';
import '../App.css';
import imagemPadrao from '../assets/capa-livro.jpg';

function MinhaEstante() {
  const navigate = useNavigate();
  const [livros, setLivros] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('usuarioLogado');
    
    if (!dadosSalvos) {
      navigate('/login');
      return;
    }

    const usuarioAtual = JSON.parse(dadosSalvos);
    setUsuario(usuarioAtual);

    fetch(`http://localhost:8080/livros/usuario/${usuarioAtual.id}`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Erro ao buscar livros');
      })
      .then(data => {
        setLivros(data);
        setCarregando(false);
      })
      .catch(error => {
        console.error("Erro:", error);
        setCarregando(false);
      });

  }, [navigate]);

  if (!usuario) return null;

  return (
    <LayoutLogado>
      <div className="hero-content" style={{ minHeight: 'auto', paddingTop: '40px' }}>
        <h1 className="dashboard-title" style={{ fontSize: '80px', fontFamily: 'Cinzel, serif' }}>
          Minha Estante
        </h1>
        <h2 className="dashboard-subtitle">
          Acervo Pessoal de {usuario.nome}
        </h2>
        <div className="divider"></div>
        <p className="dashboard-welcome" style={{ fontSize: '18px', marginTop: '10px', marginBottom: '10px' }}>
            "Os livros são espelhos: vês neles apenas o que já tens dentro de ti."
        </p>
      </div>

      <div className="perfil-container">
        
        {carregando ? (
            <div style={{ textAlign: 'center', fontFamily: 'Cinzel, serif', fontSize: '24px', color: '#452f02' }}>
                Consultando os arquivos...
            </div>
        ) : (
            <>
            {livros.length === 0 ? (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '400px',
                    textAlign: 'center'
                }}>
                    <p style={{ fontFamily: 'Crimson Text, serif', fontSize: '22px', fontStyle: 'italic', color: '#5e4003', maxWidth: '500px' }}>
                        Sua estante ainda está vazia. Vá até "Cadastrar Livro" para começar sua coleção.
                    </p>
                    <button 
                        className="btn btn-explore" 
                        onClick={() => navigate('/cadastrar-livro')}
                        style={{ marginTop: '20px' }}
                    >
                        Catalogar Primeira Obra
                    </button>
                </div>
            ) : (
                <div className="livros-grid">
                {livros.map((livro) => (
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
                    </div>
                </div>
                ))}
                </div>
            )}
            </>
        )}
      </div>
    </LayoutLogado>
  );
}

export default MinhaEstante;