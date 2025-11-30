import React from 'react';
import './ResenhaCard.css';

const ResenhaCard = ({ usuario, foto, data, livro, nota, comentario, usuarioId, onUsuarioClick }) => {
    const renderEstrelas = (nota) => {
        const estrelas = [];
        for (let i = 1; i <= 5; i++) {
            estrelas.push(
                <span key={i} className={i <= nota ? 'estrela-preenchida' : 'estrela-vazia'}>
                    ★
                </span>
            );
        }
        return estrelas;
    };

    const getNotaTexto = (nota) => {
        const textos = {
            1: 'Muito ruim',
            2: 'Ruim',
            3: 'Regular',
            4: 'Muito bom',
            5: 'Excelente'
        };
        return textos[nota] || '';
    };

    return (
        <div className="resenha-card">
            <div className="resenha-header">
                <div className="resenha-avatar-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                </div>
                <div className="resenha-info">
                    <h3 
                        className="resenha-usuario-nome"
                        onClick={() => onUsuarioClick && onUsuarioClick(usuarioId)}
                    >
                        {usuario}
                    </h3>
                    <p className="resenha-acao">Resenhou um livro</p>
                    <p className="resenha-livro">Livro: <strong>{livro}</strong></p>
                    <p className="resenha-data">{data}</p>
                </div>
            </div>

            <div className="resenha-avaliacao">
                <div className="resenha-estrelas">
                    {renderEstrelas(nota)}
                </div>
                <span className="resenha-nota-texto">
                    {nota} ({getNotaTexto(nota)})
                </span>
            </div>

            <div className="resenha-comentario">
                <p>{comentario}</p>
            </div>
        </div>
    );
};

export default ResenhaCard;
