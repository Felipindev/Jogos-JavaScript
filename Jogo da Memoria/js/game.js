const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')

const characters = [
    'neymar',
    'ronaldo',
    'gaucho',
    'roberto-carlos',
    'fred',
    'richarlison',
    'felipao',
    'vini',
    'paulinho',
    'coutinho'
]
const createElement = (tag, classname) => {
    const element = document.createElement(tag)
    element.className = classname
    return element
}

let firstCard = ''
let secondCard = ''

const checkEndgame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 20) {
        clearInterval(this.loop);

        const player = spanPlayer.innerHTML;
        const time = timer.innerHTML;

        const historico = JSON.parse(localStorage.getItem('historicoTempos')) || [];

        // Adiciona o novo registro
        historico.push({
            player,
            time
        });

        // Limita o array aos 10 últimos tempos
        const MAX_REGISTROS = 10;
        if (historico.length > MAX_REGISTROS) {
            historico.splice(0, historico.length - MAX_REGISTROS); // remove os mais antigos
        }

        // Salva de volta
        localStorage.setItem('historicoTempos', JSON.stringify(historico));

        // exibe a tela de fim de jogo
        const screen = document.getElementById('endgame-screen');
        const playerSpan = document.getElementById('endgame-player');
        const timeSpan = document.getElementById('endgame-time');

        playerSpan.textContent = player;
        timeSpan.textContent = time;

        screen.classList.remove('hidden');
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character')
    const secondCharacter = secondCard.getAttribute('data-character')

    if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card')
        secondCard.firstChild.classList.add('disabled-card')

        firstCard = ''
        secondCard = ''

        checkEndgame()
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card')
            secondCard.classList.remove('reveal-card')

            firstCard = ''
            secondCard = ''
        }, 500)
    }
}

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return
    }

    if (firstCard === ''){
        target.parentNode.classList.add('reveal-card')
        firstCard = target.parentNode
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode

        checkCards()
    }
}
    

const createCard = (character) => {
    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')

    front.style.backgroundImage = `url('../images/${character}.png')`

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', revealCard) 
    card.setAttribute('data-character', character)

    return card
}

const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters]

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5)

    shuffledArray.forEach((character) => {
        const card = createCard(character)
        grid.appendChild(card)
    })
}

const startTimer = ()=> {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML
        timer.innerHTML = currentTime + 1
    }, 1000)
}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player')
    startTimer()
    loadGame()
}