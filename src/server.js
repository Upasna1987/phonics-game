const express = require('express');
const path = require('path');
const db = require('./db/database');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

// Serve the main game page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Get a random phonics word
app.get('/api/word', (req, res) => {
    db.get('SELECT word FROM words ORDER BY RANDOM() LIMIT 1', (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ word: row ? row.word : null });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 