// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../styles/Addflashcard.css'
import { getFlashcards, addFlashcard, updateFlashcard, deleteFlashcard } from './FlashcardService';

function AdminDashboard() {
    const [flashcards, setFlashcards] = useState([]);
    const [form, setForm] = useState({ question: '', answer: '', id: null });
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.flashcard) {
            setForm(location.state.flashcard);
        }
    }, [location]);
    useEffect(()=>{
        const fetchflashcards =async()=>{
          try{
           const res=await axios.get("https://flashcard-tuf.onrender.com/flashcards");
           setFlashcards(res.data);
          }catch(err){
            console.log("error",err);
          }
        }
         fetchflashcards();
      },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.id) {
            await updateFlashcard(form.id, { question: form.question, answer: form.answer });
        } else {
            await addFlashcard({ question: form.question, answer: form.answer });
        }
        setForm({ question: '', answer: '', id: null });
        const result = await getFlashcards();
        setFlashcards(result.data);
    };

    return (
       
        <div className="container">
            <div className="card">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Question" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required />
                <input type="text" placeholder="Answer" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} required />
                <button type="submit">{form.id ? 'Update' : 'Add'}</button>
            </form>
          </div>
        </div>
        
    );
}

export default AdminDashboard;

