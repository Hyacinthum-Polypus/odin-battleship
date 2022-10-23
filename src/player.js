import shipFactory from "./ship.js";

const playerPrototype = {
    doTurn() {
        if(this.isComputer) this.computeAttack();
    },
    computeAttack() {
        let x, y;
        if(this.priorityAttacks.length > 0) {
            x = this.priorityAttacks[0].x;
            y = this.priorityAttacks[0].y;
            this.priorityAttacks.shift();
        } else {
            do
            {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
            } while(this.illegalMove(x, y)) 
        }

        const result = this.sendAttack(x, y);
        if(result == 'hit') {
            if(!this.illegalMove(x+1, y))
            this.priorityAttacks.push({x:x+1, y:y})
            if(!this.illegalMove(x-1, y))
            this.priorityAttacks.push({x:x-1, y:y})
            if(!this.illegalMove(x, y+1))
            this.priorityAttacks.push({x:x, y:y+1})
            if(!this.illegalMove(x, y-1))
            this.priorityAttacks.push({x:x, y:y-1})
        }

        return result;
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
    const priorityAttacks = [];
    return Object.assign(Object.create(playerPrototype), {gameboard, target, priorityAttacks});
}