const express = require('express');
const sql = require('mysql2');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());  // Parse cookies before routes that need it

const corsOption = {
    origin: ['http://127.0.0.1:3001', "https://flashcard-tuf.onrender.com/"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
};
app.use(cors(corsOption));

const db = sql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log('MySQL Connected...');
    }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../flashcardsProject/build')));

// API routes
app.get('/flashcards', (req, res) => {
    const query = 'SELECT * FROM flashcard';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch flashcards' });
        } else {
            res.json(results);
        }
    });
});

app.post('/flashcards', (req, res) => {
    const { question, answer } = req.body;
    const query = 'INSERT INTO flashcard (question, answer) VALUES (?, ?)';
    db.query(query, [question, answer], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to add flashcard' });
        } else {
            res.json({ message: 'Flashcard added successfully', id: results.insertId });
        }
    });
});

app.put('/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    db.query('UPDATE flashcard SET question = ?, answer = ? WHERE id = ?', [question, answer, id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to update flashcard' });
        } else {
            res.json({ message: 'Flashcard updated successfully', id: result.insertId });
        }
    });
});

app.delete('/flashcards/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM flashcard WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to delete flashcard' });
        } else {
            res.json({ message: 'Flashcard deleted successfully' });
        }
    });
});

// Serve the React app for any other routes
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../flashcardsProject/build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
