// src/services/flashcardService.js
import axios from 'axios';

const API_URL = 'https://flashcard-tuf.onrender.com';

export const getFlashcards = async () => {
    return await axios.get(API_URL);
};

export const addFlashcard = async (flashcard) => {
    return await axios.post(API_URL, flashcard);
};

export const updateFlashcard = async (id, flashcard) => {
    return await axios.put(`${API_URL}/${id}`, flashcard);
};

export const deleteFlashcard = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};
