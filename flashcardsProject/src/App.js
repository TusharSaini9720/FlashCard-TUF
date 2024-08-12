// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from'react-router-dom';
import FlashcardList from './components/FlashcardList';
import flashcards from './data/flashcard';
import Addflashcard from './components/Addflashcard';
import Navbar from './components/Navbar';
import './App.css'
const App = () => {
  return (
    <div className="App">
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<FlashcardList />} />
          <Route path="/add" element={<Addflashcard />} />
        </Routes>
      </div>
    </BrowserRouter>
  </div>
  );
};

export default App;
