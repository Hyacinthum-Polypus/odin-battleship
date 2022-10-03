import shipFactory from "./ship.js"

test("Ship length is 4", () => {
    const ship = shipFactory(4);
    expect(ship.length).toBe(4);
});

test("Hit the end of the ship.", () => {
    const ship = shipFactory(4);
    ship.hit(3);
    expect(ship.getHull(3)).toBe('hit');
});

test("Middle of ship is unhit.", () => {
    const ship = shipFactory(5);
    ship.hit(0);
    ship.hit(1);
    ship.hit(3);
    ship.hit(4);
    expect(ship.getHull(2)).toBe('unhit');
});

test("Ship is not sunk", () => {
    const ship = shipFactory(2);
    expect(ship.isSunk()).toBe(false);
});

test("Ship is sunk", () => {
    const ship = shipFactory(2);
    ship.hit(0);
    ship.hit(1);
    expect(ship.isSunk()).toBe(true);
});

test("Ship is also not sunk", () => {
    const ship = shipFactory(2);
    ship.hit(0);
    expect(ship.isSunk()).toBe(false);
});