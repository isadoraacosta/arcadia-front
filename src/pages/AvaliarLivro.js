import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LayoutLogado from '../components/LayoutLogado';
import '../App.css';

function AvaliarLivro() {
  const navigate = useNavigate();
  const location = useLocation();

  const { livro, usuario } = location.state || {};

  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState('');

  useEffect(() => {
    if (!livro || !usuario) {
      navigate('/');
    }
  }, [livro, usuario, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaAvaliacao = {
      nota: parseInt(nota),
      comentario: comentario,
      usuarioId: parseInt(usuario.id),
      livroIsbn: livro.isbn,
      usuarioId: parseInt(usuario.id),
      livroIsbn: livro.isbn
    };

    try {
      const response = await fetch('http://localhost:8080/avaliacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaAvaliacao)
      });

      if (response.ok) {
        alert("Avaliação registrada com sucesso!");
        navigate('/dashboard');
      } else {
        const errorText = await response.text();
        console.error('Erro ao salvar:', errorText);
        alert("Erro ao salvar avaliação no servidor.");
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      alert("Erro de conexão. Avaliação não salva.");
      navigate('/dashboard');
    }
  };

  if (!livro) return null;

  const labelStyle = {
    fontSize: '18px',
    marginBottom: '8px',
    color: '#452f02',
    fontFamily: 'Cinzel, serif',
    fontWeight: '700'
  };

  return (
    <LayoutLogado>
      <div className="hero-content" style={{ minHeight: 'auto', paddingTop: '40px' }}>
        <h1 className="dashboard-title" style={{ fontSize: '60px', fontFamily: 'Cinzel, serif' }}>
          Avaliar Leitura
        </h1>
        <h2 className="dashboard-subtitle">
          O que você achou de <br/> <span style={{color: '#d4af37'}}>"{livro.titulo}"</span>?
        </h2>
        <div className="divider"></div>
      </div>

      <div className="form-scroll-container">
        <form onSubmit={handleSubmit} className="book-form" style={{ maxWidth: '600px', margin: '0 auto' }}>
          
          <div className="form-group">
            <label style={labelStyle}>Quantas estrelas esta obra merece?</label>
            <select 
              className="form-input" 
              value={nota} 
              onChange={(e) => setNota(e.target.value)}
              style={{ height: '50px', fontSize: '18px', fontFamily: 'Cinzel, serif' }}
            >
              <option value="1">⭐ (1)</option>
              <option value="2">⭐⭐ (2)</option>
              <option value="3">⭐⭐⭐ (3)</option>
              <option value="4">⭐⭐⭐⭐ (4)</option>
              <option value="5">⭐⭐⭐⭐⭐ (5)</option>
            </select>
          </div>

          <div className="form-group">
            <label style={labelStyle}>Seu Veredito (Comentário)</label>
            <textarea 
              className="form-input" 
              rows="6" 
              placeholder="Descreva sua experiência..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              style={{ resize: 'vertical' }}
            ></textarea>
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button type="submit" className="btn btn-explore" style={{ padding: '15px 40px' }}>
              Gravar Avaliação
            </button>
            
            <button 
              type="button" 
              onClick={() => navigate('/dashboard')}
              onClick={() => navigate('/dashboard')}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#452f02', 
                cursor: 'pointer', 
                textDecoration: 'underline',
                fontFamily: 'Cinzel, serif'
              }}
            >
              Pular esta etapa
            </button>
          </div>

        </form>
      </div>
    </LayoutLogado>
  );
}

export default AvaliarLivro;