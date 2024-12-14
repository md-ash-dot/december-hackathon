// ---------- PIANO ---------- //

const whiteKeys = document.querySelectorAll(".white-key");
const blackKeys = document.querySelectorAll(".black-key");

blackKeys.forEach((black, index) => {
  black.addEventListener("click", () => {
    let sound = new Audio(`assets/sounds/black-keys/${index}.mp3`);
    playSound(sound);
  });
});

whiteKeys.forEach((white, index) => {
  white.addEventListener("click", () => {
    let sound = new Audio(`assets/sounds/white-keys/${index}.mp3`);
    playSound(sound);
  });
});

function playSound(sound) {
  sound.pause();
  sound.currentTime = 0;
  sound.play();
}

// ---------- QUIZ ---------- //

/* jshint esversion:8 */
//OPENING SCREEN

const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

span.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

//QUIZ

//Variables
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const questionNumber = document.getElementById('questionno');
const endScreenContainer = document.getElementById('end-screen');

let shuffledQuestions, currentQuestionIndex;
const maxNumberOfQuestions = 10;
let currentQuestionNumberCount = 0;
let finalScoreCount = 0;
let finalScorePercentage = 0;

let correctAnswerTally = document.getElementById('final-score');
let finalPercentageGrade = document.getElementById('final-percentage');

//Button event listeners
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', restartGame);

//FUNCTIONS

//Playing the game

function startGame() {
    startButton.classList.add('hide');
    nextButton.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    currentQuestionNumberCount++;
    questionNumber.innerText = currentQuestionNumberCount;
    questionElement.innerText = question.question;
    answerButtonsElement.textContent = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
            button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
        nextButton.disabled = true;
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct && correct!==undefined) {
        finalScoreCount++;
    }
    
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (maxNumberOfQuestions > currentQuestionIndex + 1) {
        nextButton.disabled = false;
    } else {
        goToEndScreen();
           }
}

//End (results) screen 

function goToEndScreen(){
    endScreenContainer.classList.remove('hide');
    correctAnswerTally.innerText = finalScoreCount;
    finalPercentageGrade.innerText = ((finalScoreCount/10)*100);
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
           }
}
    
    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }

//Restart Game

    function restartGame(){
        endScreenContainer.classList.add('hide');
        questionNumber.innerText = 0;
        currentQuestionIndex = 0;
        currentQuestionNumberCount = 0;
        finalScoreCount = 0;
        finalScorePercentage = 0;
        nextButton.classList.add('hide');
        startGame();
    }

//Questions dataset

const questions = [
  {
      question: "What is the name of the reindeer with a red nose?",
      answers: [
          { text: 'Blitzen', correct: false },
          { text: 'Rudolph', correct: true },
          { text: 'Dasher', correct: false },
          { text: 'Prancer', correct: false }
      ]
  },
  {
      question: "What color is Santa’s suit?",
      answers: [
          { text: 'Green', correct: false },
          { text: 'Red', correct: true },
          { text: 'Blue', correct: false },
          { text: 'Yellow', correct: false }
      ]
  },
  {
      question: "Which Christmas song features the line ‘Let it snow, let it snow, let it snow’?",
      answers: [
          { text: 'Jingle Bells', correct: false },
          { text: 'Let It Snow', correct: true },
          { text: 'Silent Night', correct: false },
          { text: 'Frosty the Snowman', correct: false }
      ]
  },
  {
      question: "What do we traditionally put on top of a Christmas tree?",
      answers: [
          { text: 'A star', correct: true },
          { text: 'A snowman', correct: false },
          { text: 'A bell', correct: false },
          { text: 'A candle', correct: false }
      ]
  },
  {
      question: "What is the name of the popular snowman who comes to life?",
      answers: [
          { text: 'Frosty', correct: true },
          { text: 'Jack', correct: false },
          { text: 'Snowy', correct: false },
          { text: 'Flurry', correct: false }
      ]
  },
  {
      question: "In the song ‘The Twelve Days of Christmas’, how many lords are leaping?",
      answers: [
          { text: '10', correct: false },
          { text: '12', correct: false },
          { text: '9', correct: false },
          { text: '11', correct: true }
      ]
  },
  {
      question: "What type of tree is commonly used as a Christmas tree?",
      answers: [
          { text: 'Pine', correct: true },
          { text: 'Oak', correct: false },
          { text: 'Maple', correct: false },
          { text: 'Birch', correct: false }
      ]
  },
  {
      question: "What do people traditionally hang on their Christmas stockings?",
      answers: [
          { text: 'Candies', correct: true },
          { text: 'Toys', correct: false },
          { text: 'Books', correct: false },
          { text: 'Ribbons', correct: false }
      ]
  },
  {
      question: "Who helps Santa make toys in his workshop?",
      answers: [
          { text: 'Reindeer', correct: false },
          { text: 'Elves', correct: true },
          { text: 'Snowmen', correct: false },
          { text: 'Fairies', correct: false }
      ]
  },
  {
      question: "Which Christmas movie features a boy named Kevin who is left home alone?",
      answers: [
          { text: 'The Polar Express', correct: false },
          { text: 'Home Alone', correct: true },
          { text: 'Elf', correct: false },
          { text: 'The Grinch', correct: false }
      ]
  },
  {
      question: "What is the name of the red-nosed reindeer’s mother?",
      answers: [
          { text: 'Roxy', correct: false },
          { text: 'Martha', correct: false },
          { text: 'Donner', correct: true },
          { text: 'Vixen', correct: false }
      ]
  },
  {
      question: "What holiday is celebrated on December 25th?",
      answers: [
          { text: 'Halloween', correct: false },
          { text: 'Christmas', correct: true },
          { text: 'Thanksgiving', correct: false },
          { text: 'Easter', correct: false }
      ]
  },
  {
      question: "What is the name of the Grinch’s dog?",
      answers: [
          { text: 'Max', correct: true },
          { text: 'Rex', correct: false },
          { text: 'Buddy', correct: false },
          { text: 'Jack', correct: false }
      ]
  },
  {
      question: "Which famous reindeer is known for its shiny nose?",
      answers: [
          { text: 'Comet', correct: false },
          { text: 'Vixen', correct: false },
          { text: 'Rudolph', correct: true },
          { text: 'Blitzen', correct: false }
      ]
  },
  {
      question: "What do we call the day after Christmas?",
      answers: [
          { text: 'New Year’s Eve', correct: false },
          { text: 'Boxing Day', correct: true },
          { text: 'Christmas Eve', correct: false },
          { text: 'December 26', correct: false }
      ]
  },
  {
      question: "Which country is the home of the Christmas tradition of the Nutcracker ballet?",
      answers: [
          { text: 'Russia', correct: true },
          { text: 'France', correct: false },
          { text: 'Germany', correct: false },
          { text: 'USA', correct: false }
      ]
  },
  {
      question: "In the song ‘Jingle Bells’, what is pulled through the snow?",
      answers: [
          { text: 'A sled', correct: true },
          { text: 'A sleigh', correct: false },
          { text: 'A car', correct: false },
          { text: 'A wagon', correct: false }
      ]
  },
  {
      question: "What Christmas decoration is made from red, green, and white and shaped like a ‘J’?",
      answers: [
          { text: 'Candy Cane', correct: true },
          { text: 'Christmas Tree', correct: false },
          { text: 'Snowflake', correct: false },
          { text: 'Wreath', correct: false }
      ]
  },
  {
      question: "What do people traditionally eat for Christmas dinner in the UK?",
      answers: [
          { text: 'Pizza', correct: false },
          { text: 'Roast Turkey', correct: true },
          { text: 'Hamburgers', correct: false },
          { text: 'Spaghetti', correct: false }
      ]
  },
  {
      question: "What does Santa use to deliver presents?",
      answers: [
          { text: 'A car', correct: false },
          { text: 'A bicycle', correct: false },
          { text: 'A sleigh', correct: true },
          { text: 'A bus', correct: false }
      ]
  }
];