import './style.css';
import gameBoardFactory from './gameboard.js';
import playerFactory from './player.js';

function square(x, y) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.setAttribute("data-x", x);
    square.setAttribute("data-y", y)
    return square;
}

function grid() {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    for (let y = 0; y < 10; y++) {
        for(let x = 0; x < 10; x++) {;
            grid.appendChild(square(x, y));
        }
    }
    return grid;
}

function gridSmall() {
    const grid = document.createElement('div');
    grid.classList.add('grid-small');
    for (let y = 0; y < 10; y++) {
        for(let x = 0; x < 10; x++) {;
            grid.appendChild(square(x, y));
        }
    }
    return grid;
}

function setupGame(p1, p2) {

}

function doRound(p1, p2) {

}

function endGame(p1, p2) {

}

function game() {
    const player = playerFactory(gameBoardFactory(), null, false);
    const computer = playerFactory(gameBoardFactory(), null, true);

    setupGame(player, computer);

    while(doRound(player, computer));

    endGame(player, computer);
}

document.body.appendChild(grid());
document.body.appendChild(gridSmall());

game();