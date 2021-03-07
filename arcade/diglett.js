const holes = $('.hole')
const scoreBoard =$('.score')
const moles = document.querySelectorAll('.mole')
let lastHole
let timeUp = false
let score = 0

function peekTime(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function peekHole(holes){
    const index  = Math.floor(Math.random() * holes.length)
    const hole = holes[index]

    if (hole === lastHole){
        return peekHole(holes)
    }
    lastHole = hole;
    return hole;
}

function popUp() {
    const time = peekTime(1000, 1500)
    const hole = peekHole(holes) 
    hole.classList.add('up')
    setTimeout(() => {
        hole.classList.remove('up')
        if(!timeUp) {
            popUp()
        }
    }, time);
}

function start() {
    scoreBoard.text(0)
    timeUp = false
    score = 0
    popUp()
    setTimeout(() => timeUp = true, 20000)
}

function wack(e){
    if(!e.isTrusted) return
    score++
    this.parentNode.classList.remove('up')
    scoreBoard.text(score)
}

moles.forEach(mole => mole.addEventListener('click', wack))

$('button').on('click', function () {
    start()
})