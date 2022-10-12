import './style.css';
import gameBoardFactory from './gameboard.js';
import playerFactory from './player.js';
import shipFactory from './ship.js';

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
    switch(click.target.parentNode.getAttribute("data-grid")) {
        case "placement":
            if(state = "setup") {
                if(player.gameboard.place(Number(this.getAttribute('data-x')), Number(this.getAttribute('data-y')), shipFactory(ships[0]), axis)) {

                } else {
                    ships.shift();
                }
                display(placementGrid, player.gameboard);
            }
        break;
        case "target":

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
        if(!gameboard.isEmpty(x, y)) {
            if(gameboard.getSquare(x, y).state.getHull(gameboard.getSquare(x, y).length) == 'hit') {
                const damagedHull = document.createElement('div');
                damagedHull.classList.add('ship');
                damagedHull.classList.add('damaged');
                square.appendChild(damagedHull);
            } else {
                const hull = document.createElement('div');
                hull.classList.add('ship');
                square.appendChild(hull);
            }
        }
    })
}


let state = "setup";
const ships = [5, 4, 4, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2];
let axis = 'x';
const player = playerFactory(gameBoardFactory(), false);
const computer = playerFactory(gameBoardFactory(), true);

const grids = document.createElement('div');
grids.id = 'grids'
document.body.appendChild(grids)

const placementGrid = placementGridFactory();
const targetGrid = targetGridFactory();

grids.appendChild(placementGrid);
grids.appendChild(targetGrid);
document.body.appendChild(axisButton());

const status = document.createElement('h3');
document.body.appendChild(status);