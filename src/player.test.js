import playerFactory from "./player.js";
import gameBoardFactory from "./gameboard.js";
import shipFactory from "./ship.js";

test("Player has a gameboard.", () => {
    const gameboard = gameBoardFactory();
    const player = playerFactory(gameboard); 
    expect(player.gameboard).toEqual(gameboard);
});

test("Player has a target.", () => {
    const enemy = playerFactory();
    const player = playerFactory(null, null, enemy);
    expect(player.target).toEqual(enemy);
});

test("Player sends attack to enemy and hits.", () => {
    const enemy = playerFactory(gameBoardFactory());
    enemy.gameboard.place(0, 0, shipFactory(2), 'x');
    const player = playerFactory(null, null, enemy);
    expect(player.sendAttack(0,0)).toBe("hit");
});

test("Player sends attack to enemy misses.", () => {
    const enemy = playerFactory(gameBoardFactory());
    enemy.gameboard.place(0, 0, shipFactory(2), 'x');
    const player = playerFactory(null, null, enemy);
    expect(player.sendAttack(0,1)).toBe("miss");
});

test("Player sinks all enemy ships.", () => {
    const enemy = playerFactory(gameBoardFactory());
    enemy.gameboard.place(0, 0, shipFactory(2), 'x');
    const player = playerFactory(null, null, enemy);
    player.sendAttack(0,0);
    player.sendAttack(1,0);
    expect(enemy.gameboard.isAllShipsSunk());
});

test("Computer makes a legal move.", () => {
    const computer = playerFactory(gameBoardFactory(), true, playerFactory(gameBoardFactory()), true);
    computer.doTurn();
    expect(computer.target.gameboard.misses.length).toBe(1);
});

test("Computer makes all possible legal moves on empty gameboard.", () => {
    const computer = playerFactory(gameBoardFactory(), true, playerFactory(gameBoardFactory()), true);
    for(let i = 0; i < 100; ++i)
        computer.doTurn();
    expect(computer.target.gameboard.misses.length).toBe(100);
})

test("Computer makes all possible legal moves on gameboard with ships.", () => {
    const computer = playerFactory(gameBoardFactory(), true, playerFactory(gameBoardFactory()), true);
    computer.target.gameboard.place(4, 5, shipFactory(4), 'x');

    for(let i = 0; i < 100; ++i)
        computer.doTurn();
    expect(computer.target.gameboard.misses.length + computer.target.gameboard.ships.reduce((total, ship) => {
        return total + ship.hull.reduce((total, hull) => {
            return total + (hull == "hit" ? 1 : 0);
        }, 0)
    }, 0))
    .toBe(100);
});