import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import '../App.css';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <nav className="navbar">
        <span className="navbar-logo" onClick={() => navigate('/')}>Arcadia</span>
        <div className="nav-buttons">
          <Button variant="outline" onClick={() => navigate('/login')}>Entrar</Button>
          <Button variant="outline" onClick={() => navigate('/register')}>Criar Conta</Button>
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