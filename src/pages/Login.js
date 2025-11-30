import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import '../App.css';

function Login() {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
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
  
      const response = await fetch('http://localhost:8080/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
    
        const usuario = await response.json();
        alert(`Que bom te ver, ${usuario.nome}!`);
        
     
        navigate('/dashboard'); 
      } else {
       
        alert("Email ou senha incorretos.");
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
          
          <h3>Autenticação</h3>
          <p style={{ fontSize: '18px', marginBottom: '20px' }}>
            Bem vindo(a) de volta!   <br /> 
            Identifique-se para acessar sua conta.
          </p>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            
      
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
              <Button type="submit">ENTRAR</Button>
            </div>

          </form>

        </div>

      </div>
    </Layout>
  );
}

export default Login;