import React from 'react';
import '../App.css';

const Button = ({ children, onClick, variant = 'explore', style }) => {
  const className = variant === 'outline' ? 'btn btn-outline' : 'btn btn-explore';
  
  return (
    <button className={className} onClick={onClick} style={style}>
      {children}
    </button>
  );
};

export default Button;