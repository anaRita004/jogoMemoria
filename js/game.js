//função que vai criar as cartas
const grade = document.querySelector('.grade');


const createCarta = () =>{
    const carta = document.createElement('div');
    const frente = document.createElement('div');
    const tras = document.createElement('div');

    carta.className = 'carta';
    frente.className = 'face frente';
    tras.className = 'face tras';

    carta.appendChild(frente);
    carta.appendChild(tras);

    grade.appendChild(carta);

}

createCarta();