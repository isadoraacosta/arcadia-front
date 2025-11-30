import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ResenhaCard from '../components/ResenhaCard';
import '../App.css';
import './Explorar.css';

const Explorar = () => {
    const navigate = useNavigate();
    
    const avaliacoes = [
        { 
            id: 1, 
            usuario: 'Natália Bonatto', 
            usuarioId: 1, 
            foto: '/avatar-natalia.jpg',
            livro: 'A Barraca do Beijo',
            nota: 4,
            data: '15 de Janeiro de 2024',
            comentario: 'Uma leitura envolvente e apaixonante! A história consegue prender do início ao fim com seus personagens carismáticos e situações divertidas. Recomendo para quem gosta de romances juvenis leves e descontraídos.' 
        },
        { 
            id: 2, 
            usuario: 'João Silva', 
            usuarioId: 2, 
            foto: '/avatar-joao.jpg',
            livro: '1984',
            nota: 5,
            data: '12 de Janeiro de 2024',
            comentario: 'Um clássico atemporal que nos faz refletir sobre liberdade, controle e sociedade. A escrita de Orwell é magistral e a história permanece extremamente relevante nos dias de hoje.' 
        },
        { 
            id: 3, 
            usuario: 'Maria Santos', 
            usuarioId: 3, 
            foto: '/avatar-maria.jpg',
            livro: 'O Pequeno Príncipe',
            nota: 5,
            data: '10 de Janeiro de 2024',
            comentario: 'Uma obra linda e profunda que toca o coração em qualquer idade. As metáforas sobre a vida, amor e amizade são simplesmente perfeitas. Um livro para ler e reler.' 
        },
    ];

    const handleUsuarioClick = (usuarioId) => {
        navigate(`/perfil/${usuarioId}`);
    };

    return (
        <Layout>
            <div className="explorar-container">
                <h1 className="explorar-title">Explorar Avaliações</h1>
                
                <div className="resenhas-container">
                    {avaliacoes.map(avaliacao => (
                        <ResenhaCard
                            key={avaliacao.id}
                            usuario={avaliacao.usuario}
                            usuarioId={avaliacao.usuarioId}
                            foto={avaliacao.foto}
                            livro={avaliacao.livro}
                            nota={avaliacao.nota}
                            data={avaliacao.data}
                            comentario={avaliacao.comentario}
                            onUsuarioClick={handleUsuarioClick}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Explorar;
