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

    function place(x, y, ship, axis) {
        switch(axis) {
            case 'x':
                for(let i = 0; i < ship.length; i++) {
                    if(grid[x+i][y].state != 'none') return "Fail: ship already on square (" + (x+i) + ", " + y + ")"
                }
                for(let i = 0; i < ship.length; i++) {
                    grid[x+i][y].state = ship;
                    grid[x+i][y].length = i;
                }
            break;
            case 'y':
                for(let i = 0; i < ship.length; i++) {
                    if(grid[x][y+i].state != 'none') return "Fail: ship already on square (" + x + ", " + (y+i) + ")"
                }
                for(let i = 0; i < ship.length; i++) {
                    grid[x][y+i].state = ship;
                    grid[x][y+i].length = i;   
                }
            break;
        }
    }

    function getSquare(x, y) {
        return grid[x][y];
    }

    return {place, getSquare}
}