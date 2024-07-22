const GameBoard = require('../gameBoard');
let gameBoard;

beforeEach(() => {
    gameBoard = new GameBoard();

    gameBoard.place(0, 'Carrier', false);

    expect(gameBoard.board[0]).toBe('Carrier');
    expect(gameBoard.board[1]).toBe('Carrier');
    expect(gameBoard.board[2]).toBe('Carrier');
    expect(gameBoard.board[3]).toBe('Carrier');
    expect(gameBoard.board[4]).toBe('Carrier');

    gameBoard.place(9, 'Battleship', true);
    gameBoard.place(22, 'Cruiser', false);
    gameBoard.place(50, 'Submarine', false);
    gameBoard.place(79, 'Destroyer', true)
})

it('Test hit a ship', () => {
    expect(gameBoard.receiveAttack(2)).toBeTruthy();
    expect(gameBoard.fleet[0].hits).toBe(1);
    expect(gameBoard.board[2]).toBe("hit")
})

it('Test miss', () => {
    expect(gameBoard.receiveAttack(80)).toBeFalsy();
    expect(gameBoard.board[80]).toBe("miss")
})

it('Test fleet sunk false', () => {
    expect(gameBoard.isFleetSunk()).toBeFalsy();
})

it('Test fleet sunk true', () => {
    
    expect(gameBoard.receiveAttack(0)).toBeTruthy();
    expect(gameBoard.receiveAttack(1)).toBeTruthy();
    expect(gameBoard.receiveAttack(2)).toBeTruthy();
    expect(gameBoard.receiveAttack(3)).toBeTruthy();
    expect(gameBoard.receiveAttack(4)).toBeTruthy();
    
    expect(gameBoard.receiveAttack(9)).toBeTruthy();
    expect(gameBoard.receiveAttack(19)).toBeTruthy();
    expect(gameBoard.receiveAttack(29)).toBeTruthy();
    expect(gameBoard.receiveAttack(39)).toBeTruthy();

    expect(gameBoard.receiveAttack(22)).toBeTruthy();
    expect(gameBoard.receiveAttack(23)).toBeTruthy();
    expect(gameBoard.receiveAttack(24)).toBeTruthy();
    
    expect(gameBoard.receiveAttack(50)).toBeTruthy();
    expect(gameBoard.receiveAttack(51)).toBeTruthy();
    expect(gameBoard.receiveAttack(52)).toBeTruthy();

    expect(gameBoard.receiveAttack(79)).toBeTruthy();
    expect(gameBoard.receiveAttack(89)).toBeTruthy();

    expect(gameBoard.isFleetSunk()).toBeTruthy();
})