const playerPrototype = {
    doTurn() {
        if(this.isComputer) this.computeAttack();
    },
    computeAttack() {
        let x;
        let y;
        do
        {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while(this.legalMove(x, y))

        return this.sendAttack(x, y);
    },
    legalMove(x, y) { 
        const notPrevMissed = this.target.gameboard.misses.some(coord => {
            if(coord[0] == x && coord[1] == y) return true;
        });
        if(this.target.gameboard.isEmpty(x, y)) {
            return notPrevMissed;
        } else {
            return this.target.gameboard.getSquare(x, y).state.getHull(this.target.gameboard.getSquare(x, y).length) == 'hit';
        }
    },
    sendAttack(x, y) {
        return this.target.gameboard.receiveAttack(x, y);
    },
}

export default function playerFactory(gameboard, target, isComputer) {
    return Object.assign(Object.create(playerPrototype), {gameboard, target, isComputer});
}