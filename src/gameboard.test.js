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