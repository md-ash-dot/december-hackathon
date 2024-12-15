const keyboardDiv = document.querySelector(".keyboard")

const getRandomWord = () => {
    //selects a random word and hint from the word list
    const {word,hint} = wordList[Math.floor(Math.random()*wordList.length)];
    console.log(word,hint);
}

//Creating keyboard dynamicall
for (let i = 97; i <= 122;i++) {
    const button =document.createElement("button");
    button.innerText=String.fromCharCode(i)
    keyboardDiv.appendChild(button);
}

getRandomWord()


