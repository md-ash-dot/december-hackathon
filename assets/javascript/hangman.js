const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let  currentWord,correctLetters,wrongGuessCount;
const maxGuesses = 6

const resetGame = () => {
    //resetting the game variables
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `assets/images/hangman-images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText=`${wrongGuessCount}/${maxGuesses}`;   
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(()=> `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    //selects a random word and hint from the word list
    const {word,hint} = wordList[Math.floor(Math.random()*wordList.length)];
    currentWord = word
    console.log(word);
    document.querySelector(".hint-text").innerText = hint; 
    resetGame();
}

const gameOver = (isVictory) => {
    setTimeout(()=>{
        const modalText = isVictory ? `You guessed the correct word` : `The correct word was: `
        gameModal.querySelector("img").src = `assets/images/hangman-images/${isVictory ? 'victory' : 'lost'}.gif`
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game over!'}`
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`
        gameModal.classList.add("show");
    },300)
}

const initGame=(button, clickedLetter) => {
    //Checking if clickedLetter exists in currentWord
    if(currentWord.includes(clickedLetter)) {
        //Showing correct letters on the word display
        [...currentWord].forEach((letter,index) => {
            if(letter===clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        //if clicked letter doesn't exist then update the wrongGuessedCount and hangman image 
        wrongGuessCount++;
        hangmanImage.src = `assets/images/hangman-images/hangman-${wrongGuessCount}.svg`;     
    }
    button.disabled = true;
    guessesText.innerText=`${wrongGuessCount}/${maxGuesses}`;

    //Calling gameOver function max guesses reached 
    if(wrongGuessCount ===  maxGuesses) return gameOver(false)
    if(correctLetters.length ===  currentWord.length ) return gameOver(true)
}
//Creating keyboard dynamically
for (let i = 97; i <= 122;i++) {
    const button =document.createElement("button");
    button.innerText=String.fromCharCode(i)
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame (e.target, String.fromCharCode(i)));
}

getRandomWord()
playAgainBtn.addEventListener("click",getRandomWord);
