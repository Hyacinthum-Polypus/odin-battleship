export const shipPrototype = {
    hit(pos) {
        if(pos < 0 || pos >= this.length) {
            return 'miss';
        } else {
            this.hull[pos] = 'hit';
            this.checkIfSunk();
            return 'hit';
        }
    },
    checkIfSunk() {
        for(let pos = 0; pos < this.hull.length; pos++) {
            if(this.hull[pos] == 'unhit') return;
        }
        this.sunk = true;
    },
    getHull(pos) {
        if(pos < 0 || pos >= this.length) {
            return 'bad position';
        } else {
            return this.hull[pos];
        }
    },
    isSunk() {
        return this.sunk;
    }
}

export default function shipFactory(length) {
    const hull = [];
    //Initalize hull
    for(let i = 0; i < length; i++) hull.push('unhit');
    let sunk = false;
    return Object.assign(Object.create(shipPrototype), {length: hull.length, hull, sunk});
}