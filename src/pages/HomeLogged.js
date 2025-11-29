// src/pages/HomeLogged.js
import React from 'react';
import Sidebar from '../components/Sidebar'; // Importa a nova Sidebar
import './HomeLogged.css'; // Novo arquivo CSS para HomeLogged

// Componente simples de Card para livros, avaliações, clubes
const ContentCard = ({ title, description, imageUrl, linkText, linkTo, type }) => (
  <div className={`content-card ${type}`}>
    {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
    <div className="card-body">
      <h4 className="card-title">{title}</h4>
      <p className="card-description">{description}</p>
      {linkText && linkTo && <a href={linkTo} className="card-link">{linkText}</a>}
    </div>
  </div>
);

const HomeLogged = () => {
  const currentUser = {
    nome: "LeitorAberto",
    generoPreferido: "Ficção Científica",
    livroAtual: {
      titulo: "Duna",
      autor: "Frank Herbert",
      capa: "https://m.media-amazon.com/images/I/71rV9M2YyML._AC_UF1000,1000_QL80_.jpg", // Exemplo de capa
      sinopse: "Uma épica saga de ficção científica sobre política, religião e ecologia em um deserto planetário."
    }
  };

  return (
    <div className="arcadia-app-layout"> {/* Um contêiner para o layout da aplicação */}
      <Sidebar />
      <div className="main-content-area">
        {/* Barra Superior de Navegação e Pesquisa (Inspirado no Skoob) */}
        <header className="main-header">
          <div className="search-bar-container">
            <input type="text" placeholder="Busque por título, autor, editora, ISBN..." className="search-input" />
            <select className="search-filter">
              <option value="livros">Livros</option>
              <option value="autores">Autores</option>
              <option value="clubes">Clubes</option>
              <option value="usuarios">Usuários</option>
            </select>
            <button className="search-button">🔍</button>
          </div>
          <div className="user-actions">
            <span className="welcome-text">Olá, {currentUser.nome}!</span>
            <div className="profile-icon">👤</div> {/* Ícone do usuário */}
            {/* Outros ícones, como notificações, etc. */}
          </div>
        </header>

        {/* Conteúdo Principal da Página */}
        <div className="home-logged-dashboard">
          {/* Seção de Destaque (Featured - como no Team Host) */}
          <section className="featured-section">
            {currentUser.livroAtual ? (
              <div className="featured-card-large">
                <img src={currentUser.livroAtual.capa} alt={`Capa de ${currentUser.livroAtual.titulo}`} className="featured-image-large" />
                <div className="featured-content-large">
                  <span className="featured-label">Seu Livro Atual</span>
                  <h3 className="featured-title-large">{currentUser.livroAtual.titulo}</h3>
                  <p className="featured-description-large">Por: {currentUser.livroAtual.autor}</p>
                  <p className="featured-synopsis-large">{currentUser.livroAtual.sinopse.substring(0, 150)}...</p>
                  <button className="arcadia-button primary-button">Continuar Lendo</button>
                </div>
              </div>
            ) : (
              <div className="featured-empty-state">
                <h3>Comece uma nova jornada!</h3>
                <p>Parece que você não tem um livro atual. <a href="/explore">Encontre seu próximo livro aqui!</a></p>
                <button className="arcadia-button primary-button">Explorar Livros</button>
              </div>
            )}
          </section>

          {/* Seção de Novas Avaliações */}
          <section className="content-section">
            <h2>Novas Avaliações</h2>
            <div className="cards-grid">
              <ContentCard 
                title="A Biblioteca da Meia-Noite" 
                description="Uma resenha inspiradora sobre escolhas e arrependimentos." 
                imageUrl="https://m.media-amazon.com/images/I/71Xm+P5g6XL._AC_UF1000,1000_QL80_.jpg"
                linkText="Ver Avaliação" 
                linkTo="/review/1" 
                type="review"
              />
              <ContentCard 
                title="O Pequeno Príncipe" 
                description="A releitura de um clássico sob nova perspectiva." 
                imageUrl="https://m.media-amazon.com/images/I/719FqR4b1VL._AC_UF1000,1000_QL80_.jpg"
                linkText="Ver Avaliação" 
                linkTo="/review/2" 
                type="review"
              />
              <ContentCard 
                title="Sapiens: Uma Breve História da Humanidade" 
                description="Avaliando o impacto deste best-seller na minha visão de mundo." 
                imageUrl="https://m.media-amazon.com/images/I/61H4h8kXjHL._AC_UF1000,1000_QL80_.jpg"
                linkText="Ver Avaliação" 
                linkTo="/review/3" 
                type="review"
              />
            </div>
          </section>

          {/* Seção de Clubes do Livro em Destaque */}
          <section className="content-section">
            <h2>Clubes em Destaque</h2>
            <div className="cards-grid">
              <ContentCard 
                title="Clube Clássicos" 
                description="Discutindo 'Orgulho e Preconceito'." 
                imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/PrideAndPrejudiceTitlePage.jpg/800px-PrideAndPrejudiceTitlePage.jpg"
                linkText="Entrar no Clube" 
                linkTo="/club/classicos" 
                type="club"
              />
              <ContentCard 
                title="Ficção Científica Brasil" 
                description="Próximo: 'Neuromancer'." 
                imageUrl="https://m.media-amazon.com/images/I/81k329G0gML._AC_UF1000,1000_QL80_.jpg"
                linkText="Ver Clube" 
                linkTo="/club/ficcao" 
                type="club"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomeLogged;