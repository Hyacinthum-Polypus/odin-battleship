import shipFactory from "./ship.js";

const playerPrototype = {
    doTurn() {
        if(this.isComputer) this.computeAttack();
    },
    computeAttack() {
        let x, y;
        do
        {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while(this.illegalMove(x, y))

        return this.sendAttack(x, y);
    },
    illegalMove(x, y) { 
        const notPrevMissed = this.target.gameboard.hasMissed(x, y);
        if(this.target.gameboard.isEmpty(x, y)) {
            return notPrevMissed;
        } else {
            return this.target.gameboard.getSquare(x, y).state.getHull(this.target.gameboard.getSquare(x, y).length) == 'hit';
        }
    },
    sendAttack(x, y) {
        console.log(x, y);
        if(!this.illegalMove(x, y))
        return this.target.gameboard.receiveAttack(x, y);
    },
    setup(ships) {
        while(ships.length > 0) {
            let x = null, y = null;
            do
            {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
            } while(this.gameboard.place(x, y, ships[0], Math.floor(Math.random() * 10) % 2 ? 'x' : 'y'))
            ships.shift();
        }
    },
}

export default function playerFactory(gameboard, isComputer = false, target = undefined) {
    return Object.assign(Object.create(playerPrototype), {gameboard, target, isComputer});
}