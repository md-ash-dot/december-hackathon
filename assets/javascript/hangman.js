const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");

let currentWord, wrongGuessCount = 0 
const maxGuesses = 6

const getRandomWord = () => {
    //selects a random word and hint from the word list
    const {word,hint} = wordList[Math.floor(Math.random()*wordList.length)];
    currentWord = Word
    console.log(word);
    document.querySelector(".hint-text").innerText = hint; 
    wordDisplay.innerHTML = word.split("").map(()=> `<li class="letter"></li>`).join("");
}

const intGame=(button, clickedLetter) => {
    //Checking if clickedLetter exists in currentWord
    if(currentWord.includes(clickedLetter)) {
        //Showing correct letters on the word display
        [...currentWord].forEach((letter,index) => {
            if(letter===clickedLetter) {
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        //if clicked letter doesn't exist then update the wrongGuessedCount and hangman image 
        wrongGuessCount++;
        hangmanImage.src = `assets/images/hangman-images/hangman-${wrongGuessCount}.svg`     
    }
    guessesText.innerText=`${wrongGuessCount}/${maxGuesses}`;
}
//Creating keyboard dynamically
for (let i = 97; i <= 122;i++) {
    const button =document.createElement("button");
    button.innerText=String.fromCharCode(i)
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => intGame (e.target, String.fromCharCode(i)));
}

getRandomWord()
