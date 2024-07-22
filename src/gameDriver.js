const Player = require('./player');

class GameDriver {

    player;
    computer;
    shipNames = [
        'Carrier',
        'Battleship',
        'Cruiser',
        'Submarine',
        'Destroyer'
    ]

    constructor(playerName) {
        this.player = new Player(playerName);
        this.computer = new Player('CPU');
        this.computer.gameBoard.place(0, this.shipNames[0], false);
        this.computer.gameBoard.place(9, this.shipNames[1], true);
        this.computer.gameBoard.place(22, this.shipNames[2], false);
        this.computer.gameBoard.place(50, this.shipNames[3], false);
        this.computer.gameBoard.place(70, this.shipNames[4], true);
    }

    placePlayerShip(index, shipName, vertical) {

        if(index >= 100 || index < 0) { return `${index} is an index out of range`}
        if(!this.shipNames.includes(shipName)) { return `${shipName} isn't a valid a valid ship name`}
        if(this.player.gameBoard.board.includes(shipName)) { return `${shipName} is alredy placed on the board`; }
        
        const ship = this.player.gameBoard.fleet.filter((ship) => ship.name === shipName)[0];

        if(vertical) {
            const lastIndex = index + ((ship.length - 1) * 10);
            if(lastIndex > 99) { return "The ship would go over the border"; }
        } else {
            const lastIndex = index + (ship.length - 1);
            const maxIndex = (Math.ceil((index + 1) / 10) * 10) - 1;

            if(lastIndex > maxIndex) { return "The ship would go over the border";}
        }

        return this.player.gameBoard.place(index, shipName, vertical);
    }

    evaluatePlayerMove(index) {
        if(index >= 100 || index < 0) { return true; }

        return this.computer.gameBoard.receiveAttack(index); 
    }

    computerMove(index) { return this.player.gameBoard.receiveAttack(index); }

    hasGameEnded() {
        let message = "";

        if(this.computer.gameBoard.isFleetSunk()) { message = `Player ${this.player.name} won`; }
        else if(this.player.gameBoard.isFleetSunk()) { message = "CPU won"; }

        return message;
    }
}

module.exports = GameDriver;