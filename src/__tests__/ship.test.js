const Ship = require('../ship');

it('test new ship', () => {
    const ship = new Ship(4, 'Battleship');

    expect(ship.hits < ship.length).toBeTruthy();
    expect(ship.isSunk()).toBeFalsy();
})

it('test ship hits', () => {
    const ship = new Ship(4, 'Battleship');

    ship.hit();
    ship.hit();

    expect(ship.hits).toBe(2);
})

it('test ship sinking', () => {
    const ship = new Ship(2, 'Destroyer');

    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBeTruthy();
})