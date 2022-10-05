import gameBoardFactory from "./gameboard.js";
import shipFactory from "./ship.js";

test("1 length ship is in top left corner.", () => {
    const gameboard = gameBoardFactory();
    const ship = shipFactory(2);
    gameboard.place(0, 0, ship, 'x');
    expect(gameboard.getSquare(0, 0)).toEqual({state: ship, length: 0})
});

test("5 length ship is in the left corner with the fifth position of the ship on the fifth square to the right.", () => {
    const gameboard = gameBoardFactory()
    const ship = shipFactory(5);
    gameboard.place(0, 0, ship, 'x');
    expect(gameboard.getSquare(4, 0)).toEqual({state: ship, length: 4});
});

test("5 length ship is in the left corner extending in the y axis not the x axis", () => {
    const gameboard = gameBoardFactory();
    const ship = shipFactory(5);
    gameboard.place(0, 0, ship, 'y');
    expect(gameboard.getSquare(4, 0)).toEqual({state: 'none'});
});

test("Cannot place one ship ontop of another.", () => {
    const gameboard = gameBoardFactory();
    const ship1 = shipFactory(4);
    const ship2 = shipFactory(3);
    gameboard.place(4, 4, ship1, 'y');
    expect(gameboard.place(3, 6, ship2, 'x')).toBe("Fail: ship already on square (4, 6)");
    expect(gameboard.getSquare(4, 6).state).toEqual(ship1);
});

test("Ship cannot be placed off the gameboard.", () => {
    const gameboard = gameBoardFactory();
    const ship = shipFactory(3);
    expect(gameboard.place(10, 0, ship, 'x')).toBe("Fail: Ship does not fit on gameboard.");
    expect(gameboard.place(4, 8, ship, 'y')).toBe("Fail: Ship does not fit on gameboard.");
});

test("Attack a ship on the gameboard.", () => {
    const gameboard = gameBoardFactory();
    const ship = shipFactory(3);
    gameboard.place(3, 3, ship, 'x');
    gameboard.receiveAttack(4, 3);
    expect(ship.getHull(1)).toBe('hit');
});

test("Miss a ship on the gameboard.", () => {
    const gameboard = gameBoardFactory();
    const ship = shipFactory(3);
    gameboard.place(3, 3, ship, 'x');
    gameboard.receiveAttack(4, 4);
    gameboard.receiveAttack(4, 3);
    gameboard.receiveAttack(4, 2);
    expect(gameboard.misses).toEqual([[4,4],[4,2]]);
});

test("Check that all ships are destroyed.", () => {
    const gameboard = gameBoardFactory();
    const ship1 = shipFactory(3);
    const ship2 = shipFactory(5);
    gameboard.place(2, 2, ship1, 'y');
    gameboard.place(3, 4, ship2, 'x');
    gameboard.receiveAttack(2, 2);
    gameboard.receiveAttack(2, 3);
    gameboard.receiveAttack(2, 4);
    gameboard.receiveAttack(3, 4);
    gameboard.receiveAttack(4, 4);
    gameboard.receiveAttack(5, 4);
    gameboard.receiveAttack(6, 4);
    gameboard.receiveAttack(7, 4);
    
    expect(gameboard.isAllShipsSunk()).toBe(true);
});

test("Check that all ships are not destroyed.", () => {
    const gameboard = gameBoardFactory();
    const ship1 = shipFactory(3);
    const ship2 = shipFactory(5);
    gameboard.place(2, 2, ship1, 'y');
    gameboard.place(3, 4, ship2, 'x');
    gameboard.receiveAttack(2, 2);
    gameboard.receiveAttack(2, 3);
    gameboard.receiveAttack(2, 4);
    gameboard.receiveAttack(3, 4);
    gameboard.receiveAttack(4, 4);
    gameboard.receiveAttack(5, 4);
    gameboard.receiveAttack(6, 4);
    
    expect(gameboard.isAllShipsSunk()).toBe(false);
});