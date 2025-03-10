let currentWord = '';
let displayedLetters = [];
const synth = window.speechSynthesis;

const wordDisplay = document.querySelector('.word-display');
const letterButtons = document.querySelector('.letter-buttons');
const message = document.querySelector('.message');
const nextButton = document.getElementById('nextWord');

// Phonetic sounds mapping
const phoneticSounds = {
    'a': 'ah',
    'b': 'buh',
    'c': 'kuh',
    'd': 'duh',
    'e': 'eh',
    'f': 'fuh',
    'g': 'guh',
    'h': 'huh',
    'i': 'ih',
    'j': 'juh',
    'k': 'kuh',
    'l': 'luh',
    'm': 'muh',
    'n': 'nuh',
    'o': 'oh',
    'p': 'puh',
    'q': 'kwuh',
    'r': 'ruh',
    's': 'sss',
    't': 'tuh',
    'u': 'uh',
    'v': 'vuh',
    'w': 'wuh',
    'x': 'ks',
    'y': 'yuh',
    'z': 'zzz'
};

function speakPhoneticSound(letter) {
    const utterance = new SpeechSynthesisUtterance(phoneticSounds[letter]);
    utterance.rate = 0.8; // Slightly slower speed
    utterance.pitch = 1.2; // Slightly higher pitch for clarity
    synth.speak(utterance);
}

async function getNewWord() {
    try {
        const response = await fetch('/api/word');
        const data = await response.json();
        return data.word;
    } catch (error) {
        console.error('Error fetching word:', error);
        return null;
    }
}

function displayWord(word) {
    currentWord = word;
    displayedLetters = Array(word.length).fill('_');
    wordDisplay.textContent = displayedLetters.join(' ');
}

function createLetterButtons() {
    letterButtons.innerHTML = '';
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    
    alphabet.forEach(letter => {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'letter-container';
        
        const button = document.createElement('button');
        button.textContent = letter;
        button.className = 'letter';
        button.addEventListener('click', () => checkLetter(letter));
        
        const speakerButton = document.createElement('button');
        speakerButton.innerHTML = '🔊';
        speakerButton.className = 'speaker-button';
        speakerButton.addEventListener('click', (e) => {
            e.stopPropagation();
            speakPhoneticSound(letter);
        });
        
        buttonContainer.appendChild(button);
        buttonContainer.appendChild(speakerButton);
        letterButtons.appendChild(buttonContainer);
    });
}

function checkLetter(letter) {
    let found = false;
    for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === letter) {
            displayedLetters[i] = letter;
            found = true;
        }
    }
    
    wordDisplay.textContent = displayedLetters.join(' ');
    
    if (found) {
        message.textContent = "Good job!";
        message.style.color = '#27ae60';
    } else {
        message.textContent = "Try again!";
        message.style.color = '#e74c3c';
    }
    
    if (displayedLetters.join('') === currentWord) {
        message.textContent = "Excellent work, keep going!";
        nextButton.style.display = 'block';
    }
}

async function startNewGame() {
    const word = await getNewWord();
    if (word) {
        displayWord(word);
        message.textContent = '';
        nextButton.style.display = 'none';
    }
}

nextButton.addEventListener('click', startNewGame);
createLetterButtons();
startNewGame(); 