import shipFactory from "./ship.js"

test("Ship length is 4", () => {
    let ship = shipFactory(4);
    expect(ship.length).toBe(4);
});

//test("End of ship is hit")