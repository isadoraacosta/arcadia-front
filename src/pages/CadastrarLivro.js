import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutLogado from '../components/LayoutLogado';
import '../App.css';

function CadastrarLivro() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  
  const [formData, setFormData] = useState({
    isbn: '',
    titulo: '',
    autor: '',
    genero: '',
    ano: ''
  });

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('usuarioLogado');
    if (dadosSalvos) {
      setUsuario(JSON.parse(dadosSalvos));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario || !usuario.id) {
        alert("Erro: Usuário não identificado. Faça login novamente.");
        return;
    }

    if (!formData.titulo || !formData.autor) {
      alert("Por favor, preencha pelo menos o Título e o Autor.");
      return;
    }

    const novoLivro = {
      titulo: formData.titulo,
      autor: formData.autor,
      genero: formData.genero,
      isbn: formData.isbn,
      ano: parseInt(formData.ano) || 0,
      usuarioId: usuario.id 
    };

    try {
      const response = await fetch('http://localhost:8080/livros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoLivro),
      });

      if (response.ok) {
        alert("Livro salvo na sua estante com sucesso!");
        // Redirecionar para a tela de avaliação passando os dados
        navigate('/avaliar-livro', { state: { livro: novoLivro, usuario: usuario } });
      } else {
        alert("Erro ao salvar no servidor.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão com o servidor.");
    }
  };

  if (!usuario) return null;

  return (
    <LayoutLogado>
      <div className="hero-content" style={{ minHeight: 'auto', paddingTop: '40px' }}>
        <h1 className="dashboard-title" style={{ fontSize: '80px', fontFamily: 'Cinzel, serif' }}>Novo Livro</h1>
        <h2 className="dashboard-subtitle">Catalogar obra no acervo</h2>
        <div className="divider"></div>
      </div>

      <div className="form-wrapper">
        <div className="form-container">
            <form onSubmit={handleSubmit} className="book-form">
            
            <div className="form-row">
                <div className="form-group small">
                    <label className="form-label">ISBN</label>
                    <input 
                        type="text" 
                        name="isbn" 
                        className="form-input" 
                        placeholder="Ex: 978-85-..." 
                        value={formData.isbn} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group large">
                    <label className="form-label">Título da Obra</label>
                    <input 
                        type="text" 
                        name="titulo" 
                        className="form-input" 
                        placeholder="Ex: O Nome do Vento" 
                        value={formData.titulo} 
                        onChange={handleChange} 
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group large">
                    <label className="form-label">Autor(a)</label>
                    <input 
                        type="text" 
                        name="autor" 
                        className="form-input" 
                        placeholder="Ex: Patrick Rothfuss" 
                        value={formData.autor} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group small">
                    <label className="form-label">Ano de Publicação</label>
                    <input 
                        type="number" 
                        name="ano" 
                        className="form-input" 
                        placeholder="Ex: 2007" 
                        value={formData.ano} 
                        onChange={handleChange} 
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group full">
                    <label className="form-label">Gênero Literário</label>
                    <input 
                        type="text" 
                        name="genero" 
                        className="form-input" 
                        placeholder="Ex: Fantasia, Romance..." 
                        value={formData.genero} 
                        onChange={handleChange} 
                    />
                </div>
            </div>

            <div className="form-actions">
                <button type="submit" className="btn btn-explore">
                Inscrever nos Registros
                </button>
            </div>

            </form>
        </div>
      </div>
    </LayoutLogado>
  );
}

export default CadastrarLivro;