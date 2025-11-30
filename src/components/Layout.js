import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';
import '../App.css';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('usuarioLogado');
    if (dadosSalvos) {
      setUsuario(JSON.parse(dadosSalvos));
    } else {
      setUsuario(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    setUsuario(null);
    navigate('/');
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <span 
          className="navbar-logo" 
          onClick={() => navigate(usuario ? '/dashboard' : '/')}
        >
          Arcadia
        </span>

        <div className="nav-buttons">
          {usuario ? (
            <div className="user-menu">
              <span className="menu-link" onClick={() => navigate('/dashboard')}>Minha Estante</span>
              <span className="menu-link" onClick={() => alert("Em breve")}>Clubes</span>
              <span className="menu-link" onClick={() => alert("Em breve")}>Metas</span>
              
              <div style={{ width: '1px', height: '20px', background: '#f3eacb', opacity: 0.5 }}></div>
              
              <Button 
                variant="outline" 
                onClick={handleLogout} 
                style={{ fontSize: '12px', padding: '5px 15px' }}
              >
                SAIR
              </Button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '15px' }}>
              <Button variant="outline" onClick={() => navigate('/login')}>Entrar</Button>
              <Button variant="outline" onClick={() => navigate('/register')}>Criar Conta</Button>
            </div>
          )}
        </div>
      </nav>

      <main style={{ flex: 1, width: '100%' }}>
        {children}
      </main>

      <footer className="footer">
        © 2025 Arcadia Book Club
      </footer>
    </div>
  );
};

export default Layout;