export default function gameBoardFactory() {
    const grid = [
        [{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},],
        [{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},],
        [{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},],
        [{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},],
        [{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},],
        [{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},],
        [{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},],
        [{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},],
        [{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},],
        [{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},{state:'none'},],
    ];
    const misses = [];
    const ships = [];

    function place(x, y, ship, axis) {
        if(x < 0 || x > 9 || y < 0 || y > 9) return "Fail: Ship does not fit on gameboard.";
        switch(axis) {
            case 'x':
                for(let i = 0; i < ship.length; i++) {
                    if(x + i > 9) return "Fail: Ship does not fit on gameboard.";
                    else if(grid[x+i][y].state != 'none') return "Fail: ship already on square (" + (x+i) + ", " + y + ")"
                }
                for(let i = 0; i < ship.length; i++) {
                    grid[x+i][y].state = ship;
                    grid[x+i][y].length = i;
                }
            break;
            case 'y':
                for(let i = 0; i < ship.length; i++) {
                    if(y + i > 9) return "Fail: Ship does not fit on gameboard."
                    if(grid[x][y+i].state != 'none') return "Fail: ship already on square (" + x + ", " + (y+i) + ")"
                }
                for(let i = 0; i < ship.length; i++) {
                    grid[x][y+i].state = ship;
                    grid[x][y+i].length = i;   
                }
            break;
        }
        ships.push(ship);
    }

    function getSquare(x, y) {
        return grid[x][y];
    }

    function receiveAttack(x, y) {
        if(grid[x][y].state != 'none')
        {
            grid[x][y].state.hit(grid[x][y].length);
        } else {
            addMiss(x, y);
        }
    }

    function addMiss(x, y) {
        misses.push([x, y]);
    }

    function isAllShipsSunk() {
        for(let element = 0; element < ships.length; ++element) {
            const ship = ships[element];
            if(!ship.isSunk()) {
                return false;
            }
        }
        return true;
    }

    return {place, getSquare, receiveAttack, misses, isAllShipsSunk}
}