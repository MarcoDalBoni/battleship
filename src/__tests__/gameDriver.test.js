const GameDriver = require('../gameDriver');
let game;

beforeAll(() => { game = new GameDriver('TestPlayer')});

it('Test place player ship succesful', () => {
    expect(game.placePlayerShip(0, 'Destroyer', true)).toBe('Ship correctly placed.');
    expect(game.placePlayerShip(25, 'Submarine', false)).toBe('Ship correctly placed.');  
})

it('Test place player ship invalid index', () => {
    expect(game.placePlayerShip(-12, 'Cruiser', false)).toBe(`${-12} is an index out of range`);
    expect(game.placePlayerShip(100, 'Cruiser', false)).toBe(`${100} is an index out of range`);
})

it('Test place player ship invalid ship name', () => {
    expect(game.placePlayerShip(12, 'Sail', true)).toBe(`${'Sail'} isn't a valid a valid ship name`);
    expect(game.placePlayerShip(12, 'Destroyer', true)).toBe(`${'Destroyer'} is alredy placed on the board`);
}) 

it('Test place ship length over borders', () => {
    expect(game.placePlayerShip(80, 'Carrier', true)).toBe('The ship would go over the border');
    expect(game.placePlayerShip(7, 'Carrier', false)).toBe('The ship would go over the border');
})

it('Test place ship overlapping', () => {
    expect(game.placePlayerShip(16, 'Battleship', true)).toBe('Invalid position.');
    expect(game.placePlayerShip(23, 'Battleship', false)).toBe('Invalid position.');
})

it('Test place ship touching', () => {
    expect(game.placePlayerShip(21, 'Battleship', false)).toBe('Invalid position.');
    expect(game.placePlayerShip(36, 'Cruiser', true)).toBe('Invalid position.');
    expect(game.placePlayerShip(12, 'Battleship', false)).toBe('Invalid position.');
    expect(game.placePlayerShip(17, 'Cruiser', false)).toBe('Invalid position.');
    expect(game.placePlayerShip(28, 'Cruiser', true)).toBe('Invalid position.');
    expect(game.placePlayerShip(8, 'Cruiser', true)).toBe('Invalid position.');
    expect(game.placePlayerShip(20, 'Cruiser', true)).toBe('Invalid position.');
})

it('Test player move invalid index', () => {
    expect(game.evaluatePlayerMove(-12)).toBeTruthy();
    expect(game.evaluatePlayerMove(100)).toBeTruthy();
})

it('Test player move miss', () => {
    expect(game.evaluatePlayerMove(5)).toBeFalsy();
    expect(game.evaluatePlayerMove(92)).toBeFalsy();
})

it('Test player move already missed', () => {
    expect(game.evaluatePlayerMove(5)).toBeTruthy();
    expect(game.evaluatePlayerMove(92)).toBeTruthy();
})

it('Test player move hit', () => {
    expect(game.evaluatePlayerMove(70)).toBeTruthy();
    expect(game.evaluatePlayerMove(80)).toBeTruthy();
})

it('Test game not ended', () => {
    expect(game.hasGameEnded()).toBe("");
})

it('Test game is ended', () => {
    expect(game.evaluatePlayerMove(0)).toBeTruthy();
    expect(game.evaluatePlayerMove(1)).toBeTruthy();
    expect(game.evaluatePlayerMove(2)).toBeTruthy();
    expect(game.evaluatePlayerMove(3)).toBeTruthy();
    expect(game.evaluatePlayerMove(4)).toBeTruthy();

    expect(game.evaluatePlayerMove(9)).toBeTruthy();
    expect(game.evaluatePlayerMove(19)).toBeTruthy();
    expect(game.evaluatePlayerMove(29)).toBeTruthy();
    expect(game.evaluatePlayerMove(39)).toBeTruthy();

    expect(game.evaluatePlayerMove(22)).toBeTruthy();
    expect(game.evaluatePlayerMove(23)).toBeTruthy();
    expect(game.evaluatePlayerMove(24)).toBeTruthy();
    
    expect(game.evaluatePlayerMove(50)).toBeTruthy();
    expect(game.evaluatePlayerMove(51)).toBeTruthy();
    expect(game.evaluatePlayerMove(52)).toBeTruthy();

    expect(game.hasGameEnded()).toBe('Player TestPlayer won');
})