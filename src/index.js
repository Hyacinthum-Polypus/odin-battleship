import './style.css';
import gameBoardFactory from './gameboard.js';
import playerFactory from './player.js';

function square(x, y) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.setAttribute("data-x", x);
    square.setAttribute("data-y", y)
    square.addEventListener('click', clickSquare);
    return square;
}

function gridFactory() {
    const grid = document.createElement('div');
    for (let y = 0; y < 10; y++) {
        for(let x = 0; x < 10; x++) {;
            grid.appendChild(square(x, y));
        }
    }
    return grid;
}

function placementGridFactory() {
    const grid = gridFactory();
    grid.id = 'grid';
    grid.setAttribute("data-grid", "placement");
    return grid;
}

function targetGridFactory() {
    const grid = gridFactory();
    grid.id = 'grid-small';
    grid.setAttribute("data-grid", "target");
    return grid;
}

function axisButton() {
    const frame = document.createElement('div');
    frame.id = "axis-frame";
    const axis = document.createElement('button');
    axis.textContent = "Switch Axis";
    frame.appendChild(axis);
    const axisState = document.createElement('h3');
    axisState.textContent = "X";
    frame.appendChild(axisState);
    axis.addEventListener('click', () => {switchAxis(axisState)});
    return frame;
}

function switchAxis(axisState) {
    switch(axis) {
        case 'x':
            axisState.textContent = 'Y';
            axis = 'y';
        break;
        case 'y':
            axisState.textContent = 'X';
            axis = 'x';
    }
}

function clickSquare(click) {
    switch(this.parentNode.getAttribute("data-grid")) {
        case "placement":
            if(state == "setup") {
                if(player.gameboard.place(Number(this.getAttribute('data-x')), Number(this.getAttribute('data-y')), playersShips[0], axis)) {

                } else {
                    playersShips.shift();
                }
                display(placementGrid, player.gameboard);
                status.textContent = `Place remaining ships on placement board. [${playersShips}]`;

                if(playersShips.length == 0) {
                    computer.setup(computerShips);
                    state = "turn";
                    status.textContent = "It is your turn. Select free square on target board.";
                    display(targetGrid, computer.gameboard);
                }
            }
        break;
        case "target":
            if(state == "turn") {
                player.sendAttack(Number(this.getAttribute("data-x")), Number(this.getAttribute("data-y")));
                display(targetGrid, computer.gameboard);
            }
        break;
    }
}

function clear(grid) {
    Array.from(grid.children).forEach(square => {
        Array.from(square.children).forEach(child => {
            child.remove();
        });
    });
}

function display(grid, gameboard) {
    clear(grid);
    Array.from(grid.children).forEach(square => {
        const x = Number(square.getAttribute("data-x"));
        const y = Number(square.getAttribute("data-y"));
        const child = document.createElement('div');
        child.classList.add('square-child');
        square.appendChild(child);
        if(!gameboard.isEmpty(x, y)) {
            if(gameboard.getSquare(x, y).state.getHull(gameboard.getSquare(x, y).length) == 'hit') {
                child.classList.add('damaged');
            } else {
                child.classList.add('ship');
            }
        } else {
            if(gameboard.hasMissed(x, y)) {
                child.classList.add('missed');
            }
        }
    })
}


let state = "setup";
const playersShips = [5, 4, 4, 3, 3, 3, 3, 2, 2];
const computerShips = [5, 4, 4, 3, 3, 3, 3, 2, 2];
let axis = 'x';
const player = playerFactory(gameBoardFactory(), false);
const computer = playerFactory(gameBoardFactory(), true);

player.target = computer;
computer.target = player;

const grids = document.createElement('div');
grids.id = 'grids'
document.body.appendChild(grids)

const placementGrid = placementGridFactory();
const targetGrid = targetGridFactory();

grids.appendChild(placementGrid);
grids.appendChild(targetGrid);
document.body.appendChild(axisButton());

const status = document.createElement('h3');
status.id = "status";
status.textContent = `Place remaining ships on placement board. [${playersShips}]`;
document.body.appendChild(status);