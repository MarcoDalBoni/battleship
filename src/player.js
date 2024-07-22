const GameBoard = require('./gameBoard');

class Player {
    
    name;
    gameBoard;

    constructor(name) {
        this.name = name;
        this.gameBoard = new GameBoard();
    }
}

module.exports = Player;