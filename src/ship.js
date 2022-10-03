export default function shipFactory(length) {
    const hull = [];
    //Initalize hull
    for(let i = 0; i < length; i++) hull.push('unhit');

    function hit(pos) {
        if(pos < 0 || pos >= length) {
            return 'miss';
        } else {
            hull[pos] = 'hit';
            checkIfSunk();
            return 'hit';
        }
    }

    function checkIfSunk() {
        for(let pos = 0; pos < hull.length; pos++) {
            if(hull[pos] == 'unhit') return;
        }
        sunk = true;
    }

    function getHull(pos) {
        if(pos < 0 || pos >= length) {
            return 'bad position';
        } else {
            return hull[pos];
        }
    }

    let sunk = false;
    function isSunk() {
        return sunk;
    }

    return {length: hull.length, getHull, hit, isSunk};
}