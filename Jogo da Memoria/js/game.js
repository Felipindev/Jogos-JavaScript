const grid = document.querySelector('.grid')

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
    const disabledCards = document.querySelectorAll('.disabled-card')

    if (disabledCards.length === 20) {
        setTimeout(() => {
            alert('Parabéns, você conseguiu!')
        }, 10)
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

loadGame()
