// src/components/Navigation.js
import React from 'react';
import '../styles/Navigation.css';

const Navigation = ({ onPrevious, onNext, hasPrevious, hasNext }) => {
  return (
    <div className="navigation">
      <button onClick={onPrevious} disabled={!hasPrevious}>
        Previous
      </button>
      <button onClick={onNext} disabled={!hasNext}>
        Next
      </button>
    </div>
  );
};

export default Navigation;
