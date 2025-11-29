import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import '../App.css';

function Register() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: ''
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch('http://localhost:8080/api/usuarios/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });

      if (response.ok) {
        alert("Leitor(a) registrado com sucesso! Bem-vindo a Arcadia!");
        
      } else {
        alert("Erro ao registrar.");
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      alert("Não foi possível conectar com o servidor :(");
    }
  };

  return (
    <Layout>
      <div className="hero-content" style={{ minHeight: 'auto', marginTop: '40px' }}>
        

       <div className="feature-card no-hover" style={{ width: '400px', padding: '40px', animationDelay: '0s' }}>
          
          <h3>Junte-se à Sociedade</h3>
          <p style={{ fontSize: '18px', marginBottom: '20px' }}>
            Preencha seus dados para iniciar sua jornada literária.
          </p>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            
            <label style={{ color: '#f3eacb', marginBottom: '5px' }}>Seu Nome</label>
            <input 
              type="text" 
              name="nome"
              className="form-input"
              placeholder="Ex: Elizabeth Bennet"
              value={formData.nome}
              onChange={handleChange}
              required
            />

            <label style={{ color: '#f3eacb', marginBottom: '5px' }}>Endereço de Email</label>
            <input 
              type="email" 
              name="email"
              className="form-input"
              placeholder="email@exemplo.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label style={{ color: '#f3eacb', marginBottom: '5px' }}>Senha</label>
            <input 
              type="password" 
              name="senha"
              className="form-input"
              placeholder="*******"
              value={formData.senha}
              onChange={handleChange}
              required
            />

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <Button type="submit">CADASTRE-SE</Button>
            </div>

          </form>

        </div>

      </div>
    </Layout>
  );
}

export default Register;