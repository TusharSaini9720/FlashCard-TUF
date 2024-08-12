// src/components/Flashcard.js
import React, { useState } from 'react';
import '../styles/Navigation.css';

const Flashcard = ({ flashcard }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="flashcard-front">
       Q- {flashcard.question}
      </div>
      <div className="flashcard-back">
        A- {flashcard.answer}
      </div>
    </div>
  );
};

export default Flashcard;
