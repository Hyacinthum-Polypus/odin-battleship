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
    const x = Number(this.getAttribute("data-x")), y = this.getAttribute("data-y");
    switch(this.parentNode.getAttribute("data-grid")) {
        case "placement":
            if(state == "setup") {
                if(player.gameboard.place(x, y, playersShips[0], axis)) {

                } else {
                    playersShips.shift();
                }
                display(placementGrid, player.gameboard);
                status.textContent = `Place remaining ships on placement board. [${playersShips}]`;

                if(playersShips.length == 0) {
                    computer.setup(computerShips);
                    state = "playerTurn";
                    status.textContent = "It is your turn. Select free square on target board.";
                    display(targetGrid, computer.gameboard, false);
                }
            }
        break;
        case "target":
            if(state == "playerTurn") {
                const result = player.sendAttack(x, y);
                if(result) {
                    display(targetGrid, computer.gameboard, false);
                    console.log(result);
                    status.textContent = `${result == "hit" ? player.target.gameboard.getSquare(x, y).state.isSunk() ? "You sunk my battleship! " : "" : ""}Computer's turn. Please wait.`;
                    state = "computerTurn";
                    if(computer.gameboard.isAllShipsSunk()) {
                        state = "gameover";
                        status.textContent = "You won!";
                        return;
                    }

                    setTimeout(() => {
                        computer.computeAttack();
                        display(placementGrid, player.gameboard);
                        status.textContent = "It is your turn. Select free square on target board.";
                        state = "playerTurn";
                        if(player.gameboard.isAllShipsSunk()) {
                            state = "gameover";
                            status.textContent = "You lose!";
                            return;
                        }
                    }, 1000);
                }
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

function display(grid, gameboard, displayShips = true) {
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
            } else if(displayShips) {
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