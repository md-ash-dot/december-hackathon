const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')]
const scoreEl = document.querySelector('.score span')
const timerEl = document.querySelector('.timer span')
const startButton = document.querySelector('#startGame')
const howToPlayButton = document.querySelector('#howToPlay') // Select the How to Play button
let score = 0
let timeLeft = 15
let gameRunning = false

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
    alert(`🎄 Whack The Grinch 🎄\n\nGame over! Your score is ${score}.`)
    gameRunning = false
    holes.forEach(hole => (hole.innerHTML = '')) // Clear all holes
    startButton.disabled = false // Re-enable the start button
}

function run() {
    if (!gameRunning) return
    const i = Math.floor(Math.random() * holes.length)
    const hole = holes[i]
    let timer = null

    const img = document.createElement('img')
    img.classList.add('grinch')
    img.src = 'assets/images/day8/grinch.png'

    img.addEventListener('click', () => {
        score += 10
        sound.play()
        scoreEl.textContent = score
        img.src = 'assets/images/day8/grinch-whacked.png'
        clearTimeout(timer)
        setTimeout(() => {
            hole.removeChild(img)
            run()
        }, 500)
    })

    hole.appendChild(img)

    timer = setTimeout(() => {
        hole.removeChild(img)
        if (timeLeft > 0) run()
    }, 1500)
}

// Event listener for the start button
startButton.addEventListener('click', () => {
    if (!gameRunning) {
        gameRunning = true
        score = 0
        timeLeft = 15
        scoreEl.textContent = score
        startButton.disabled = true // Disable the button during the game
        startCountdown()
        run()
    }
})

// Event listener for the How to Play button
howToPlayButton.addEventListener('click', () => {
    alert(
        "🎄 Whack The Grinch 🎄\n\n" +
        "How to Play:\n\n- Click on the Grinch to score points.\n- Each Grinch you hit gives you 10 points.\n- The game lasts for 30 seconds.\n- Try to get the highest score possible!"
    )
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
