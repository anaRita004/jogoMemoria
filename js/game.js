// Seleciona a grade onde as cartas serão adicionadas
const grade = document.querySelector('.grade');

// Lista de lixeiras (tipos de lixo)
const lixeiras = [
    'Amarelo',
    'Azul',
    'Branco',
    'Cinza',
    'Laranja',
    'Marrom',
    'Preto',
    'Roxo',
    'Verde',
    'Vermelho',
];

// Função para criar elementos HTML com uma classe específica
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCarta = '';
let secondCarta = '';
let lockBoard = false; // Para evitar que mais de duas cartas sejam clicadas ao mesmo tempo

const checkEndGame = () => {
    const disabledCartas = document.querySelectorAll('.disabled-carta'); // Corrigido para querySelectorAll

    // Verificar se todas as cartas estão desativadas (20 cartas no total)
    if (disabledCartas.length === 20) {
        alert('Parabéns, você conseguiu!');
    }
}

const checkCartas = () => {
    const firstLixeira = firstCarta.getAttribute('data-lixeira');
    const secondLixeira = secondCarta.getAttribute('data-lixeira');

    if (firstLixeira === secondLixeira) {
        // Se as cartas combinam, aplicar o estilo opaco e preto e branco
        firstCarta.firstChild.classList.add('disabled-carta'); // Corrigido para firstChild
        secondCarta.firstChild.classList.add('disabled-carta'); // Corrigido para firstChild
        firstCarta = '';
        secondCarta = '';
        lockBoard = false;

        checkEndGame(); // Verifica o fim do jogo após cada combinação
    } else {
        // Se não combinam, virar as cartas novamente após um pequeno delay
        setTimeout(() => {
            firstCarta.classList.remove('reveal-carta');
            secondCarta.classList.remove('reveal-carta');
            firstCarta = '';
            secondCarta = '';
            lockBoard = false;
        }, 700); // 1 segundo para o jogador ver as cartas antes de virarem novamente
    }
}

// Função para revelar as cartas
const revealcarta = ({ target }) => {
    if (lockBoard || target.parentNode.className.includes('reveal-carta')) {
        return;
    }

    target.parentNode.classList.add('reveal-carta');

    if (firstCarta === '') {
        firstCarta = target.parentNode;
    } else if (secondCarta === '') {
        secondCarta = target.parentNode;
        lockBoard = true;
        checkCartas();
    }
}

// Função para criar uma carta com frente e verso
const createCarta = (lixeira) => {
    const carta = createElement('div', 'carta');
    const frente = createElement('div', 'face frente');
    const tras = createElement('div', 'face tras');

    frente.style.backgroundImage = `url('../imagens/${lixeira}.png')`;

    carta.appendChild(frente);
    carta.appendChild(tras);

    carta.addEventListener('click', revealcarta);
    carta.setAttribute('data-lixeira', lixeira);

    return carta;
}

const loadGame = () => {
    const duplicatelixeiras = [ ...lixeiras, ...lixeiras ];

    const shuffledArray = duplicatelixeiras.sort(() => Math.random() - 0.5);

    grade.innerHTML = '';

    shuffledArray.forEach((lixeira) => {
        const carta = createCarta(lixeira);
        grade.appendChild(carta);
    });
};

loadGame();
