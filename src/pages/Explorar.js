import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutLogado from '../components/LayoutLogado'; // Garanta que este caminho está certo
import ResenhaCard from '../components/ResenhaCard';
import '../App.css';

const Explorar = () => {
    const navigate = useNavigate();
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        fetchAvaliacoes();
    }, []);

    const fetchAvaliacoes = async () => {
        try {
            setLoading(true);
            setErro(null);
            const response = await fetch('http://localhost:8080/avaliacoes');
            if (response.ok) {
                const data = await response.json();
                // Ordenar por data mais recente primeiro
                const sortedData = data.sort((a, b) => new Date(b.dataAvaliacao) - new Date(a.dataAvaliacao));
                setAvaliacoes(sortedData);
            } else {
                setErro('Erro ao buscar avaliações. Tente novamente.');
                console.error('Erro ao buscar avaliações:', response.status);
            }
        } catch (error) {
            setErro('Erro de conexão com o servidor.');
            console.error('Erro de conexão:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatarData = (dataString) => {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
    };

    const handleUsuarioClick = (usuarioId) => {
        if (usuarioId) {
            navigate(`/perfil/${usuarioId}`);
        }
    };

    return (
        <LayoutLogado>
            <div className="hero-content" style={{ minHeight: 'auto', paddingTop: '40px' }}>
                <h1 className="dashboard-title" style={{ fontSize: '80px', fontFamily: 'Cinzel, serif' }}>
                    Avaliações
                </h1>
                <div className="divider"></div>
            </div>
            
            <div className="form-scroll-container">
                <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
                    {loading ? (
                        <p style={{ textAlign: 'center', color: 'var(--cor-tinta)' }}>
                            Carregando avaliações...
                        </p>
                    ) : erro ? (
                        <p style={{ textAlign: 'center', color: '#d32f2f', fontSize: '16px' }}>
                            {erro}
                        </p>
                    ) : avaliacoes.length === 0 ? (
                        <p style={{ textAlign: 'center', color: 'var(--cor-tinta)' }}>
                            Nenhuma avaliação disponível ainda.
                        </p>
                    ) : (
                        avaliacoes.map(avaliacao => (
                            <ResenhaCard
                                key={avaliacao.id}
                                usuario={avaliacao.usuario?.nome || 'Usuário'}
                                usuarioId={avaliacao.usuario?.id}
                                foto={avaliacao.usuario?.foto || '/avatar-default.jpg'}
                                livro={avaliacao.livro?.titulo || 'Livro'}
                                nota={avaliacao.nota}
                                data={formatarData(avaliacao.dataAvaliacao)}
                                comentario={avaliacao.comentario}
                                onUsuarioClick={handleUsuarioClick}
                            />
                        ))
                    )}
                </div>
            </div>
        </LayoutLogado>
    );
};

export default Explorar;