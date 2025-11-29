import React from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import FeatureCard from "../components/FeatureCard";
import "../App.css";

function Home() {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Layout>
      <div className="hero-content">
        <h1>Arcadia</h1>
         
        <div className="divider"></div>

        <p>
          Uma verdade universalmente reconhecida: quem tem um bom livro precisa de alguém para debatê-lo. Junte-se à nossa sociedade, compartilhe suas impressões e encontre mentes afins.
        </p>

        <Button onClick={scrollToFeatures}>Conheça nossa sociedade</Button>
      </div>

      <div id="features" className="features-container">
        <FeatureCard 
          title="Sua Estante" 
          description="Organize, com graça e boa ordem, suas leituras passadas, presentes e futuras em um registro que revele seu refinamento."
          delay="0.2s"
        />
        <FeatureCard 
          title="Círculos de Leitura" 
          description="Debata capítulos, compartilhe teorias e encontre sua guilda literária."
          delay="0.5s"
        />
        <FeatureCard 
          title="Metas & Conquistas" 
          description="Defina desafios anuais e acompanhe seu progresso através de novos mundos."
          delay="0.8s"
        />
      </div>
    </Layout>
  );
}

export default Home;