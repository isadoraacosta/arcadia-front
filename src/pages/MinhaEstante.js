import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LayoutLogado from '../components/LayoutLogado';

function MinhaEstante() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarDados = async () => {
      const dadosSalvos = localStorage.getItem('usuarioLogado');
      
      if (!dadosSalvos) {
        navigate('/login');
        return;
      }

      try {
        const usuarioLogado = JSON.parse(dadosSalvos);
        const userId = id || usuarioLogado.id;

        if (!userId) {
          console.error('ID do usuário não encontrado');
          navigate('/login');
          return;
        }

        // Buscar dados do usuário
        const userResponse = await fetch(`http://localhost:8080/api/usuarios/${userId}`);
        if (!userResponse.ok) throw new Error('Erro ao buscar usuário');
        const userData = await userResponse.json();
        setUsuario(userData);

        // Buscar avaliações do usuário
        const avaliacoesResponse = await fetch(`http://localhost:8080/avaliacoes/usuario/${userId}`);
        if (!avaliacoesResponse.ok) throw new Error('Erro ao buscar avaliações');
        const avaliacoesData = await avaliacoesResponse.json();

        console.log('Avaliações recebidas:', avaliacoesData);

        // Agrupar avaliações por livro
        const livrosMap = {};
        for (const avaliacao of avaliacoesData) {
          const livroId = avaliacao.livro?.id || avaliacao.livroId;
          const livroTitulo = avaliacao.livro?.titulo || 'Título Desconhecido';
          const livroAutor = avaliacao.livro?.autor || 'Autor Desconhecido';
          
          if (!livrosMap[livroId]) {
            livrosMap[livroId] = {
              id: livroId,
              titulo: livroTitulo,
              autor: livroAutor,
              capa: '📚',
              avaliacoes: []
            };
          }
          livrosMap[livroId].avaliacoes.push({
            data: new Date(avaliacao.dataAvaliacao).toLocaleDateString('pt-BR'),
            nota: avaliacao.nota,
            comentario: avaliacao.comentario
          });
        }

        console.log('Livros agrupados:', livrosMap);
        
        setLivros(Object.values(livrosMap));
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert('Erro ao carregar dados. Tente novamente.');
        setLoading(false);
      }
    };

    buscarDados();
  }, [navigate, id]);

  if (loading) {
    return (
      <LayoutLogado>
        <div style={{padding: '50px', textAlign: 'center', color: '#452f02'}}>
          <h2>Carregando...</h2>
        </div>
      </LayoutLogado>
    );
  }

  if (livroSelecionado) {
    return (
      <LayoutLogado>
        <div style={{padding: '50px', maxWidth: '800px', margin: '0 auto', color: '#452f02'}}>
          <button 
            onClick={() => setLivroSelecionado(null)}
            style={{
              background: '#d4a574',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '30px',
              fontSize: '16px',
              color: '#452f02'
            }}
          >
            ← Voltar para Estante
          </button>

          <div style={{textAlign: 'center', marginBottom: '40px'}}>
            <div style={{fontSize: '80px', marginBottom: '15px'}}>{livroSelecionado.capa}</div>
            <h2 style={{margin: '10px 0'}}>{livroSelecionado.titulo}</h2>
            <p style={{fontSize: '18px', opacity: 0.7}}>{livroSelecionado.autor}</p>
          </div>

          <h3 style={{marginBottom: '20px', textAlign: 'center'}}>Minhas Avaliações</h3>

          {livroSelecionado.avaliacoes.map((aval, index) => (
            <div key={index} style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              marginBottom: '20px'
            }}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                <span style={{fontSize: '14px', opacity: 0.7}}>{aval.data}</span>
                <span style={{fontSize: '18px'}}>{'⭐'.repeat(aval.nota)}</span>
              </div>
              <p style={{margin: 0, lineHeight: '1.6'}}>{aval.comentario}</p>
            </div>
          ))}
        </div>
      </LayoutLogado>
    );
  }

  return (
    <LayoutLogado>
      <div style={{padding: '50px', maxWidth: '1000px', margin: '0 auto', color: '#452f02'}}>
        
        {/* Perfil do Usuário - Centralizado */}
        <div style={{
          background: 'linear-gradient(135deg, #f5e6d3 0%, #e8d4b8 100%)',
          padding: '30px',
          borderRadius: '15px',
          marginBottom: '50px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: '#d4a574',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            marginBottom: '15px'
          }}>
            👤
          </div>
          <h1 style={{margin: '0 0 5px 0'}}>{usuario?.nome || 'Usuário'}</h1>
          <p style={{margin: '5px 0', opacity: 0.8}}>{usuario?.email || ''}</p>
        </div>

        {/* Minha Estante */}
        <h2 style={{textAlign: 'center', marginBottom: '30px', fontSize: '28px'}}>📚 Minha Estante</h2>

        {livros.length === 0 ? (
          <p style={{textAlign: 'center', fontSize: '18px', opacity: 0.7}}>
            Você ainda não avaliou nenhum livro. Comece avaliando sua primeira leitura!
          </p>
        ) : (
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px'}}>
            {livros.map(livro => (
              <div 
                key={livro.id} 
                onClick={() => setLivroSelecionado(livro)}
                style={{
                  background: '#fff',
                  padding: '20px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{fontSize: '60px', marginBottom: '10px'}}>{livro.capa}</div>
                <h4 style={{margin: '10px 0'}}>{livro.titulo}</h4>
                <p style={{fontSize: '14px', opacity: 0.7}}>{livro.autor}</p>
                <p style={{fontSize: '12px', marginTop: '10px', color: '#d4a574'}}>
                  {livro.avaliacoes.length} avaliação(ões)
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </LayoutLogado>
  );
}

export default MinhaEstante;