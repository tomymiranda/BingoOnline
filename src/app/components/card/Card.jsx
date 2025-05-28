"use client";

import React, { useState } from 'react';
import './Card.css';


const Card = ({ title }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const toggleCompleted = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div 
      className={`card ${isCompleted ? 'completed' : ''}`}
      onClick={toggleCompleted}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && toggleCompleted()}
    >
      <div className="card-content">
        <h2 >
          {title}
        </h2>
      </div>
    </div>
  );
};

export default Card;