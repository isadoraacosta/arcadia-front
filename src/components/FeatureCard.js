import React from 'react';
import '../App.css';

const FeatureCard = ({ title, description, delay }) => {
  return (
    <div className="feature-card" style={{ animationDelay: delay }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;