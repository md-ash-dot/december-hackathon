const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')]
const scoreEl = document.querySelector('.score span')
const timerEl = document.querySelector('.timer span')
const startButton = document.querySelector('#startGame') // Select the start button
let score = 0
let timeLeft = 15 // Game duration in seconds
let gameRunning = false // To track if the game is running

const sound = new Audio("assets/images/day8/smash.mp3")

function startCountdown() {
    timerEl.textContent = timeLeft
    const countdown = setInterval(() => {
        timeLeft--
        timerEl.textContent = timeLeft
        if (timeLeft <= 0) {
            clearInterval(countdown)
            endGame()
        }
    }, 1000)
}

function endGame() {
    alert(`Game over! Your score is ${score}`)
    gameRunning = false
    holes.forEach(hole => (hole.innerHTML = '')) // Clear all holes
    startButton.disabled = false // Re-enable the start button
}

function run() {
    if (!gameRunning) return // Stop running if the game ends
    const i = Math.floor(Math.random() * holes.length)
    const hole = holes[i]
    let timer = null

    const img = document.createElement('img')
    img.classList.add('mole')
    img.src = 'assets/images/day8/mole.png'

    img.addEventListener('click', () => {
        score += 10
        sound.play()
        scoreEl.textContent = score
        img.src = 'assets/images/day8/mole-whacked.png'
        clearTimeout(timer)
        setTimeout(() => {
            hole.removeChild(img)
            run()
        }, 500)
    })

    hole.appendChild(img)

    timer = setTimeout(() => {
        hole.removeChild(img)
        if (timeLeft > 0) run() // Stop spawning if the timer reaches 0
    }, 1500)
}

// Event listener for the start button
startButton.addEventListener('click', () => {
    if (!gameRunning) {
        gameRunning = true
        score = 0
        timeLeft = 30
        scoreEl.textContent = score
        startButton.disabled = true // Disable the button during the game
        startCountdown()
        run()
    }
})

// Cursor logic
window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'
})
window.addEventListener('mousedown', () => {
    cursor.classList.add('active')
})
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
})
