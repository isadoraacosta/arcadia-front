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
      <div className="hero-content">
        
        <h1 className="dashboard-title">
          Arcadia
        </h1>

        <h2 className="dashboard-subtitle">
          O Santuário das Histórias
        </h2>

        <div className="divider"></div>
        
        <p className="dashboard-welcome">
          Bem-vindo(a)! <br/><br/>
          Arcadia é o reino atemporal onde todas as narrativas convergem. Mais do que um simples registro, este é o solo sagrado onde suas leituras ganham vida, onde o conhecimento é preservado e onde cada página virada expande as fronteiras do seu próprio mundo. Organize seu legado, pois aqui, todo leitor é um guardião de lendas.
        </p>
      </div>

      <div className="features-container">
        
        <div onClick={() => navigate('/minha-estante')}>
          <FeatureCard 
            title="Minha Estante" 
            description="Seu acervo pessoal. Visualize livros lidos, em andamento e sua lista de desejos."
            delay="0s"
          />
        </div>

        <div onClick={() => navigate('/minhas-metas')}>
          <FeatureCard 
            title="Pergaminho de Metas" 
            description="Defina seus desafios anuais e acompanhe o progresso da sua jornada literária."
            delay="0.2s"
          />
        </div>

        <div onClick={() => navigate('/biblioteca')}>
          <FeatureCard 
            title="Grande Biblioteca" 
            description="Adentre os arquivos de Arcadia. Descubra novas obras e veja avaliações."
            delay="0.4s"
          />
        </div>

        <div onClick={() => navigate('/cadastrar-livro')}>
          <FeatureCard 
            title="Catalogar Novo Tomo" 
            description="Contribua para a expansão do reino registrando obras ainda não descobertas."
            delay="0.6s"
          />
        </div>

        <div onClick={() => navigate('/clubes')}>
          <FeatureCard 
            title="Guildas & Clubes" 
            description="Reúna-se com outros viajantes no salão comunal para debater grandes histórias."
            delay="0.8s"
          />
        </div>


        <div onClick={() => navigate('/explorar')}>
          <FeatureCard 
            title="Explorar Avaliações" 
            description="Descubra o que outros viajantes estão lendo e suas opiniões sobre obras de Arcadia."
            delay="1.0s"
          />
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;