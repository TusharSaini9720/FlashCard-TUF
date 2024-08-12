// src/components/FlashcardList.js
import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from'react';
import Flashcard from './Flashcard';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navigation.css';
import { getFlashcards, addFlashcard, updateFlashcard, deleteFlashcard } from './FlashcardService';
const FlashcardList = () => {
  const [flashcards,setflashcards] =useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
   const navigate=useNavigate();

    useEffect(()=>{
      const fetchflashcards =async()=>{
        try{
         const res=await axios.get("https://flashcard-tuf.onrender.com");
         setflashcards(res.data);
        }catch(err){
          console.log("error",err);
        }
      }
       fetchflashcards();
    },[]);

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleEdit = (flashcard) => {
    navigate('/add', { state: { flashcard } });
  };

const handleDelete = async (id) => {
    await deleteFlashcard(id);
    const result = await getFlashcards();
    setflashcards(result.data);
};
  //console.log(flashcards[currentIndex].answer);

  return (
    
    <div className="flashcard-list">
     {flashcards.length > 0 && <Flashcard flashcard={flashcards[currentIndex]} />}
     
     <div className="flashcard-actions">
        <button onClick={() => handleEdit(flashcards[currentIndex])}>Edit</button>
        <button onClick={() => handleDelete(flashcards[currentIndex].id)}>Delete</button>
      </div>

      <div className="navigation">
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentIndex === flashcards.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashcardList;
