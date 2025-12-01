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
    ano: '',
  });

  const [previewImagem, setPreviewImagem] = useState(null);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setFormData(prevState => ({
          ...prevState,
          imagem: reader.result
        }));
        setPreviewImagem(reader.result);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.titulo || !formData.autor) {
      alert("Por favor, preencha pelo menos o Título e o Autor.");
      return;
    }

    const novoLivro = {
      ...formData,
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
        const livroSalvo = await response.json();
        alert("O livro foi inscrito nos registros de Arcadia com sucesso!");
        
        navigate('/avaliar-livro', { 
            state: { 
                livro: livroSalvo,
                usuario: usuario 
            } 
        });

      } else {
        const livroSemImagem = { ...novoLivro, imagem: '' };
        const livrosAntigos = JSON.parse(localStorage.getItem('livrosArcadia')) || [];
        localStorage.setItem('livrosArcadia', JSON.stringify([...livrosAntigos, livroSemImagem]));
        
        alert("Salvo localmente (sem imagem devido ao limite de armazenamento)!");
        
        navigate('/avaliar-livro', { 
            state: { 
                livro: livroSemImagem,
                usuario: usuario 
            } 
        });
      }
    } catch (error) {
      console.error(error);
      const livroSemImagem = { ...novoLivro, imagem: '' };
      const livrosAntigos = JSON.parse(localStorage.getItem('livrosArcadia')) || [];
      localStorage.setItem('livrosArcadia', JSON.stringify([...livrosAntigos, livroSemImagem]));
      
      alert("Salvo localmente (sem imagem devido ao erro de conexão)!");
      
      navigate('/avaliar-livro', { 
        state: { 
            livro: livroSemImagem,
            usuario: usuario 
        } 
      });
    }
  };

  if (!usuario) return null;

  const labelStyle = {
    fontSize: '18px',
    marginBottom: '8px',
    color: '#452f02',
    fontFamily: 'Cinzel, serif',
    fontWeight: '700'
  };

  return (
    <LayoutLogado>
      <div className="hero-content" style={{ minHeight: 'auto', paddingTop: '40px' }}>
        <h1 className="dashboard-title" style={{ fontSize: '80px', fontFamily: 'Cinzel, serif' }}>Novo Livro</h1>
        <h2 className="dashboard-subtitle">Catalogar obra no acervo</h2>
        <div className="divider"></div>
      </div>

      <div className="form-scroll-container">
        <form onSubmit={handleSubmit} className="book-form">
          
          <div className="form-row">
            <div className="form-group" style={{ flex: 1 }}>
              <label style={labelStyle}>ISBN</label>
              <input 
                type="text" 
                name="isbn" 
                className="form-input" 
                placeholder="Ex: 978-85-..."
                value={formData.isbn}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group" style={{ flex: 2 }}>
              <label style={labelStyle}>Título da Obra</label>
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
            <div className="form-group" style={{ flex: 2 }}>
              <label style={labelStyle}>Autor(a)</label>
              <input 
                type="text" 
                name="autor" 
                className="form-input" 
                placeholder="Ex: Patrick Rothfuss"
                value={formData.autor}
                onChange={handleChange}
              />
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label style={labelStyle}>Ano de Publicação</label>
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
            <div className="form-group" style={{ flex: 1 }}>
              <label style={labelStyle}>Gênero Literário</label>
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


          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button type="submit" className="btn btn-explore" style={{ padding: '15px 50px', marginBottom: '20px'}}>
              Inscrever nos Registros
            </button>
          </div>

        </form>
      </div>
    </LayoutLogado>
  );
}

export default CadastrarLivro;