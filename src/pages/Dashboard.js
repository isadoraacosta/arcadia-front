import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import FeatureCard from '../components/FeatureCard';
import '../App.css';

function Dashboard() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('usuarioLogado');
    if (dadosSalvos) {
      setUsuario(JSON.parse(dadosSalvos));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!usuario) return null;

  return (
    <Layout>
      <div className="hero-content" style={{ minHeight: 'auto', padding: '40px 0' }}>
        
        <h1 style={{ 
          fontFamily: 'Cinzel, serif', 
          fontSize: '60px', 
          marginTop: '0',
          color: '#2d2d2d',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          Meus Aposentos
        </h1>

        <div className="divider"></div>
        <p>
          Bem-vindo(a) de volta, <strong>{usuario.nome}</strong>. <br/>
          O que deseja fazer em sua jornada literária hoje?
        </p>
      </div>

      <div className="features-container" style={{ padding: '20px', gap: '40px' }}>
        
        <div onClick={() => alert("Em breve: Lista de Livros!")} style={{ cursor: 'pointer' }}>
          <FeatureCard 
            title="Minha Estante" 
            description="Visualize seus livros lidos, em andamento e sua lista de desejos."
            delay="0s"
          />
        </div>

        <div onClick={() => alert("Em breve: Escrever Resenha!")} style={{ cursor: 'pointer' }}>
          <FeatureCard 
            title="Diário de Críticas" 
            description="Escreva suas impressões e dê notas para as obras que você desbravou."
            delay="0.2s"
          />
        </div>

        <div onClick={() => alert("Em breve: Clubes!")} style={{ cursor: 'pointer' }}>
          <FeatureCard 
            title="Guildas & Clubes" 
            description="Encontre grupos de leitura e participe de debates semanais."
            delay="0.4s"
          />
        </div>

        <div onClick={() => alert("Em breve: Buscar Amigos!")} style={{ cursor: 'pointer' }}>
          <FeatureCard 
            title="Salão de Encontros" 
            description="Faça novas amizades e veja o que outros leitores estão lendo."
            delay="0.6s"
          />
        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;