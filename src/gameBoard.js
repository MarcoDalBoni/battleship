const Ship = require("./ship");

class GameBoard {

    board = [];
    fleet = [
       new Ship(5, "Carrier"),
       new Ship(4, "Battleship"),
       new Ship(3, "Submarine"),
       new Ship(3, "Cruiser"),
       new Ship(2, "Destroyer")
    ];

    constructor() {
        for(let i = 0; i < 100; i++) {
            this.board.push("");
        }
    }

    place(index, shipName, vertical) {

        const ship = this.fleet.filter((ship) => ship.name === shipName)[0];
        let jump = 1;
        let checkSides = 10;
        let maxNext = Math.ceil((index + 1) / 10) * 10 - 1;
        let minSides = 0;
        let maxSides = 99;
        if (vertical) {
            jump = 10;
            checkSides = 1;
            maxNext = 99;
        }
        let checkBack = index - jump;
        let message = 'Ship correctly placed.';
        let coordinates = [];

        if(this.board[index] !== "" || 
            (checkBack >= 0 && this.board[checkBack] !== "")) { return 'Invalid position.'}
            
        for(let i = 0, coordinate = index, next = index + jump;
                i < ship.length;
                i++, coordinate += jump, next += jump) {

                    if (vertical) {
                        minSides = Math.floor(coordinate / 10) * 10;
                        maxSides = Math.ceil((coordinate + 1) / 10) * 10 - 1;
                    }

                    let leftSide = coordinate - checkSides;
                    let rightSide = coordinate + checkSides;

                    if ((next <= maxNext && this.board[next] !== "") ||
                        (leftSide >= minSides && this.board[leftSide] !== "") ||
                        (rightSide <= maxSides && this.board[rightSide] !== "")) {
                        message = 'Invalid position.';
                        break;
                    }

                    coordinates.push(coordinate);
        }

        if (message === 'Ship correctly placed.') {
            coordinates.forEach((coordinate) => this.board[coordinate] = shipName)
        }

        return message;
    }

    receiveAttack(index) {

        if(this.board[index] === "miss" || this.board[index] === "hit") { return true; }

        if(this.board[index] === "") {
            this.board[index] = "miss";
            return false; 
        }

        const shipName = this.board[index];
        this.board[index] = "hit";
        this.fleet.map((ship) => { if(ship.name === shipName) { ship.hit(); } });

        return true;
    }

    isFleetSunk() {

        let sunk = true;

        this.fleet.forEach((ship) => {
            if(!ship.isSunk()) {
                sunk = false;
            }
        });

        return sunk;
    }
}

module.exports = GameBoard;