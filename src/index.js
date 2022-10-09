import './style.css';

function grid() {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    for (let index = 0; index < 100; index++) {
        const square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
    }
    return grid;
}

function gridSmall() {
    const grid = document.createElement('div');
    grid.classList.add('grid-small');
    for (let index = 0; index < 100; index++) {
        const square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
    }
    return grid;
}

document.body.appendChild(grid());
document.body.appendChild(gridSmall());