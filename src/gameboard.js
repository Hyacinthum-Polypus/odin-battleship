const gameBoardPrototype = {
    place(x, y, ship, axis) {
        if(x < 0 || x > 9 || y < 0 || y > 9) return "Fail: Ship does not fit on gameboard.";
        switch(axis) {
            case 'x':
                for(let i = 0; i < ship.length; i++) {
                    if(x + i > 9) return "Fail: Ship does not fit on gameboard.";
                    else if(this.grid[x+i][y].state != 'none') return "Fail: ship already on square (" + (x+i) + ", " + y + ")"
                }
                for(let i = 0; i < ship.length; i++) {
                    this.grid[x+i][y].state = ship;
                    this.grid[x+i][y].length = i;
                }
            break;
            case 'y':
                for(let i = 0; i < ship.length; i++) {
                    if(y + i > 9) return "Fail: Ship does not fit on gameboard."
                    if(this.grid[x][y+i].state != 'none') return "Fail: ship already on square (" + x + ", " + (y+i) + ")"
                }
                for(let i = 0; i < ship.length; i++) {
                    this.grid[x][y+i].state = ship;
                    this.grid[x][y+i].length = i;   
                }
            break;
        }
        this.ships.push(ship);
    },
    getSquare(x, y) {
        return this.grid[x][y];
    },
    receiveAttack(x, y) {
        if(this.grid[x][y].state != 'none')
        {
            this.grid[x][y].state.hit(this.grid[x][y].length);
        } else {
            this.addMiss(x, y);
        }
    },
    addMiss(x, y) {
        this.misses.push([x, y]);
    },
    isAllShipsSunk() {
        for(let element = 0; element < this.ships.length; ++element) {
            const ship = this.ships[element];
            if(!ship.isSunk()) {
                return false;
            }
        }
        return true;
    }
}

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

    return Object.assign(Object.create(gameBoardPrototype), {grid, misses, ships});
}