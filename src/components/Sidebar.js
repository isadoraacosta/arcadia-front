// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css'; // Criaremos este CSS

const Sidebar = () => {
  return (
    <div className="arcadia-sidebar">
      <div className="sidebar-header">
        <span className="sidebar-logo-text">Arcadia</span> {/* Sua logo ou texto */}
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li><a href="/dashboard">Dashboard</a></li> {/* Uma visão geral */}
          <li><a href="/profile">Meu Perfil</a></li>
          <li><a href="/my-books">Meus Livros</a></li>
          <li><a href="/friends">Amigos</a></li>
          <li><a href="/reviews">Minhas Avaliações</a></li>
          <li><a href="/clubs">Clubes do Livro</a></li>
          <li><a href="/explore">Explorar Livros</a></li>
          <li><a href="/settings">Configurações</a></li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        {/* Talvez um link para logout ou suporte */}
      </div>
    </div>
  );
};

export default Sidebar;