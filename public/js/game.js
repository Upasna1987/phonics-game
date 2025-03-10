const synth = window.speechSynthesis;
let childName = '';
let currentLetter = '';
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
let currentIndex = 0;

// DOM Elements
const nameInput = document.getElementById('nameInput');
const gameArea = document.getElementById('gameArea');
const childNameInput = document.getElementById('childName');
const startGameButton = document.getElementById('startGame');
const welcomeMessage = document.getElementById('welcomeMessage');
const currentLetterDisplay = document.querySelector('.current-letter');
const speakButton = document.getElementById('speakLetter');
const rocketButton = document.getElementById('rocketButton');
const nextButton = document.getElementById('nextLetter');

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

function startGame() {
    childName = childNameInput.value.trim();
    if (!childName) {
        alert('Please enter the child\'s name');
        return;
    }
    
    nameInput.classList.add('hidden');
    gameArea.classList.remove('hidden');
    welcomeMessage.textContent = `Let's learn letters, ${childName}!`;
    currentIndex = 0;
    showCurrentLetter();
}

function showCurrentLetter() {
    currentLetter = alphabet[currentIndex];
    currentLetterDisplay.textContent = currentLetter;
    speakPhoneticSound(currentLetter);
}

function speakPhoneticSound(letter) {
    const utterance = new SpeechSynthesisUtterance(phoneticSounds[letter]);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    synth.speak(utterance);
}

function speakCongratulations() {
    const messages = [
        `Great work ${childName}, keep going!`,
        `Excellent job ${childName}!`,
        `Wonderful ${childName}, you're doing great!`,
        `Amazing work ${childName}!`
    ];
    const message = messages[Math.floor(Math.random() * messages.length)];
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    synth.speak(utterance);
}

function showConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function nextLetter() {
    currentIndex = (currentIndex + 1) % alphabet.length;
    showCurrentLetter();
}

// Event Listeners
startGameButton.addEventListener('click', startGame);
speakButton.addEventListener('click', () => speakPhoneticSound(currentLetter));
rocketButton.addEventListener('click', () => {
    showConfetti();
    speakCongratulations();
});
nextButton.addEventListener('click', nextLetter); 