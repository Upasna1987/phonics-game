const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'phonics.sqlite'), (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        createTable();
        insertInitialWords();
    }
});

function createTable() {
    db.run(`CREATE TABLE IF NOT EXISTS words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word TEXT NOT NULL UNIQUE,
        phonics_pattern TEXT NOT NULL
    )`);
}

function insertInitialWords() {
    const words = [
        { word: 'cat', pattern: 'CVC' },
        { word: 'dog', pattern: 'CVC' },
        { word: 'fish', pattern: 'CVCC' },
        { word: 'ship', pattern: 'CCVC' },
        { word: 'rain', pattern: 'CVVC' },
        { word: 'tree', pattern: 'CCVV' },
        { word: 'frog', pattern: 'CCVC' },
        { word: 'star', pattern: 'CCVC' },
        { word: 'moon', pattern: 'CVVC' },
        { word: 'bird', pattern: 'CVCC' }
    ];
    
    const stmt = db.prepare('INSERT OR IGNORE INTO words (word, phonics_pattern) VALUES (?, ?)');
    words.forEach(({word, pattern}) => {
        stmt.run(word, pattern);
    });
    stmt.finalize();
}

module.exports = db; 