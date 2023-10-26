let btn = document.querySelector('.btn'),
    input = document.querySelector('.input'),
    timeOut = document.querySelector('.time'),
    gameBox = document.querySelector('.game__block'),
    time = 0,
    score = 0,
    interval = 0;
let shapes = []

btn.addEventListener('click', (event) => {
    event.preventDefault()
    if (input.value > 4) {
        time = input.value
        input.value = ''
        score = 0
        clearInterval(interval)
        start()
        let result = document.querySelector('.result')
        if (result) {
            result.style.display = 'none'
        }
    }
})

gameBox.addEventListener('click', (event) => {
    if (event.target.classList.contains('ball')) {
        score++
        event.target.remove()
        createBall()
    }
})




function start() {
    btn.disabled = true
    timeOut.innerHTML = time
    interval = setInterval(() => {
        decrease()
    }, 1000);
    createBall()
}

function decrease() {
    if (time == 0) {
        endGame()
    } else {
        let currentTime = --time
        timeOut.innerHTML = currentTime
    }
}

function endGame() {
    gameBox.innerHTML = `<h2 class="result">Вы набрали: ${score} очков</h2>`
    btn.disabled = false
}

function randomForm() {
    const ballForms = [
        'polygon(50% 0%, 0% 100%, 100% 100%);',
        'polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%);',
        'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%);',
        'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);',
    ];
    let randomNum = Math.floor(Math.random() * ballForms.length);
    return ballForms[randomNum];
}

function createBall() {
    let ball = document.createElement('div')
    ball.classList.add('ball');
    let ballSize = randomSize();
    // let size = 40
    let coor = gameBox.getBoundingClientRect()
    let x = random(0, coor.width - ballSize)
    let y = random(0, coor.height - ballSize)
    ball.style = `clip-path:${randomForm()};background: ${setColor()};width:${ballSize}px;height:${ballSize}px;top:${y}px;left:${x}px`;
    console.log(randomForm());
    gameBox.append(ball);
}






function randomSize() {
    let size = Math.floor((Math.random() * 80) + 10);
    return size;
}
// 




function randomColor() {
    return Math.floor(Math.random() * 256);
}

function setColor(el) {
    return `rgb(${randomColor()},${randomColor()},${randomColor()})`;
}


function random(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min)
}