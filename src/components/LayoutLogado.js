import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function LayoutLogado({ children }) {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('usuarioLogado');
    if (dadosSalvos) {
      setUsuario(JSON.parse(dadosSalvos));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    navigate('/');
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div 
          className="navbar-logo" 
          onClick={() => navigate('/dashboard')}
        >
          Arcadia
        </div>
        
        <div className="nav-buttons"  style={{ alignItems: 'center' }}>
          <button 
            onClick={() => navigate('/dashboard')}
            className="btn btn-outline"
          >
            DASHBOARD
          </button>
          
          <button 
            onClick={() => navigate(`/perfil/${usuario?.id}`)}
            className="btn btn-outline"
          >
            MINHA ESTANTE
          </button>
          
          <button 
            onClick={() => navigate('/explorar')}
            className="btn btn-outline"
          >
            EXPLORAR
          </button>
          
          <button 
            onClick={() => navigate('/cadastrar-livro')}
            className="btn btn-outline"
          >
            CADASTRAR LIVRO
          </button>

          <div style={{
            borderLeft: '1px solid rgba(243, 234, 203, 0.5)',
            height: '30px',
            margin: '0 10px'
          }}></div>

          <span style={{
            color: '#ffffff',
            fontSize: '14px',
            fontFamily: 'Cinzel, serif',
            fontWeight: '600',
            marginRight: '10px'
          }}>
            {usuario?.nome || 'Usuário'}
          </span>

          <button 
            onClick={handleLogout}
            className="btn btn-outline"

          >
            SAIR
          </button>
        </div>
      </nav>

      {children}

      <footer className="footer">
        © 2025 Arcadia Book Club 
      </footer>
    </div>
  );
}

export default LayoutLogado;
