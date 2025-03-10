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

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

module.exports = {
    getRandomWord
}; 