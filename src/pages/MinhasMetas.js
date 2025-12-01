import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import '../App.css';

function MinhasMetas() {
  const navigate = useNavigate();
  const [novaMeta, setNovaMeta] = useState('');
  const [metas, setMetas] = useState([]);
  const [usuario, setUsuario] = useState(null);
  
  const API_URL = 'http://localhost:8080/metas'; 

  useEffect(() => {
    const dadosUsuario = localStorage.getItem('usuarioLogado');
    if (!dadosUsuario) {
      navigate('/login');
      return;
    }
    
    const usuarioAtual = JSON.parse(dadosUsuario);
    setUsuario(usuarioAtual);

    fetch(`${API_URL}/usuario/${usuarioAtual.id}`)
      .then(response => {
        if (!response.ok) throw new Error('Erro ao buscar metas');
        return response.json();
      })
      .then(data => setMetas(data))
      .catch(err => console.error("Erro de conexão ao carregar:", err));

  }, [navigate]);

  const adicionarMeta = async (e) => {
    e.preventDefault();
    if (!novaMeta.trim()) return;

    const dto = {
      descricao: novaMeta,
      usuarioId: usuario?.id || 1 
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(dto)
      });

      if (response.ok) {
        const metaCriada = await response.json();
        setMetas([...metas, metaCriada]);
        setNovaMeta('');
      } else {
        console.error("O servidor rejeitou a criação da meta.");
        alert("Erro ao salvar. Verifique se você está logado corretamente.");
      }
    } catch (error) {
      console.error("Erro ao salvar meta:", error);
    }
  };

  const alternarStatus = async (id) => {
    const listaAntiga = [...metas];
    const novaLista = metas.map(meta => 
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
    );
    setMetas(novaLista);

    try {
      const response = await fetch(`${API_URL}/${id}/status`, { method: 'PUT' });
      if (!response.ok) throw new Error('Falha ao atualizar');
    } catch (error) {
      setMetas(listaAntiga);
      console.error("Erro ao atualizar status:", error);
      alert("Não foi possível atualizar o status no servidor.");
    }
  };

  const deletarMeta = async (id) => {
    const confirmar = window.confirm("Deseja realmente queimar este registro? Esta ação não pode ser desfeita.");
    if (!confirmar) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      
      if (response.ok) {
        setMetas(metas.filter(meta => meta.id !== id));
      } else {
        alert("Erro ao tentar excluir a meta.");
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
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
    <Layout>
      <div className="hero-content" style={{ minHeight: 'auto', paddingTop: '40px' }}>
        <h1 className="dashboard-title" style={{ fontSize: '80px', fontFamily: 'Cinzel, serif' }}>
          Pergaminho de Metas
        </h1>
        <h2 className="dashboard-subtitle">
          Juramentos Literários
        </h2>
        <div className="divider"></div>
        <p className="dashboard-welcome" style={{ fontSize: '18px', marginTop: '10px', marginBottom: '10px' }}>
            "Um objetivo sem um plano é apenas um desejo."
        </p>
      </div>

      <div className="form-scroll-container" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '100px' }}>
        
        <form onSubmit={adicionarMeta} className="book-form" style={{ marginBottom: '50px' }}>
          <div className="form-row" style={{ alignItems: 'flex-end' }}> 
            
            <div className="form-group" style={{ flex: 3 }}>
              <label style={labelStyle}>Novo Objetivo</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Ex: Ler 12 clássicos este ano..."
                value={novaMeta}
                onChange={(e) => setNovaMeta(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <button 
                type="submit" 
                className="btn btn-explore" 
                style={{ width: '100%', padding: '12px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                Selar Juramento
              </button>
            </div>

          </div>
        </form>

        <div className="lista-metas">
          {metas.length === 0 ? (
            <div style={{ 
                textAlign: 'center', 
                color: 'var(--cor-tinta)', 
                fontStyle: 'italic', 
                opacity: 0.7, 
                fontFamily: 'Crimson Text, serif',
                fontSize: '22px', 
                marginTop: '40px'
            }}>
              O pergaminho está em branco... Inscreva sua primeira meta acima.
            </div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {metas.map((meta) => (
                <li key={meta.id} style={{
                  background: meta.concluida ? 'rgba(230, 255, 230, 0.4)' : 'rgba(255, 253, 245, 0.7)',
                  border: '1px solid var(--cor-tinta)',
                  borderRadius: '4px', 
                  padding: '20px 25px',
                  marginBottom: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 4px 8px rgba(69, 47, 2, 0.1)',
                  transition: 'all 0.3s'
                }}>
                  
                  <div 
                    onClick={() => alternarStatus(meta.id)}
                    title={meta.concluida ? "Marcar como pendente" : "Marcar como concluída"}
                    style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        cursor: 'pointer',
                        flex: 1,
                        userSelect: 'none'
                    }}
                  >
                    <div style={{
                        width: '24px',
                        height: '24px',
                        border: '2px solid var(--cor-tinta)',
                        borderRadius: '4px',
                        marginRight: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: meta.concluida ? 'var(--cor-tinta)' : 'transparent',
                        transition: 'all 0.2s'
                    }}>
                        {meta.concluida && <span style={{ color: '#fffdf5', fontSize: '16px', fontWeight: 'bold' }}>✓</span>}
                    </div>

                    <span style={{ 
                      fontSize: '22px', 
                      fontFamily: 'Crimson Text, serif',
                      color: 'var(--cor-tinta)',
                      textDecoration: meta.concluida ? 'line-through' : 'none',
                      opacity: meta.concluida ? 0.6 : 1,
                      fontStyle: meta.concluida ? 'italic' : 'normal',
                      transition: 'all 0.3s'
                    }}>
                      {meta.descricao}
                    </span>
                  </div>

                  <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        deletarMeta(meta.id);
                    }}
                    style={{
                      background: 'transparent',
                      border: '1px solid #8b0000',
                      borderRadius: '4px',
                      color: '#8b0000',
                      cursor: 'pointer',
                      fontSize: '16px',
                      marginLeft: '15px',
                      padding: '5px 15px',
                      fontFamily: 'Cinzel, serif',
                      transition: 'all 0.2s'
                    }}
                    title="Excluir meta permanentemente"
                    onMouseEnter={(e) => {
                        e.target.style.background = '#8b0000';
                        e.target.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = '#8b0000';
                    }}
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </Layout>
  );
}

export default MinhasMetas;