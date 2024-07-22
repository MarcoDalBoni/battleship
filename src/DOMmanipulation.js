import './style.css';
import Icon from './check.png';
const GameDriver = require('./gameDriver');
const inputName = document.getElementById('inputName');
const submitName = document.getElementById('submitName');
const message = document.getElementById('message');
const playerBoard = document.getElementById('playerBoard');
const computerBoard = document.getElementById('computerBoard');
const selectShip = document.getElementById('selectShip');
const resetButton = document.getElementById('resetButton');
const toggleVertical = document.getElementById('toggleVertical');
const startGameButton = document.getElementById('startGame');
startGameButton.disabled = true;
const check = new Image();
check.src = Icon;
let game;
let vertical = false;
let nameSubmitted = false;
let playerCells = [];
let playerCellsClickable = [];
let computerCells = [];
let computerCellsClickable = [];
let placedShips = [];
submitName.addEventListener('click', () => startDriver());
toggleVertical.addEventListener('click', () => { if(nameSubmitted) { clickToggleVertical(); } });
resetButton.addEventListener('click', () => reset());
startGameButton.addEventListener('click', () => startGame());

function startDriver() {

    if(!inputName.value) {
        message.textContent = "Insert your name.";
        return;
    }

    game = new GameDriver(inputName.value);
    loadPlayerBoard()
    loadShipOptions(); 
    submitName.disabled = true;
    inputName.disabled = true;
    selectShip.disabled = false;
    startGameButton.disabled = false;
    nameSubmitted = true;

    message.textContent = "Select your ships";
}

function loadPlayerBoard() {

    let index = 0;

    for(let i = 0; i < 10; i++) {

        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
    
        for(let j = 0; j < 10; j++) {
    
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            cellDiv.id = index;
            playerCellsClickable.push(true);
            cellDiv.addEventListener('click', () => {
                if(playerCellsClickable[Number(cellDiv.id)]) { placeBoat(Number(cellDiv.id)); }
            });
            index++;
    
            playerCells.push(cellDiv);
            rowDiv.appendChild(cellDiv);
        }
    
        playerBoard.appendChild(rowDiv);
    }
}

function loadShipOptions() {

    while(selectShip.firstChild) {
        selectShip.removeChild(selectShip.firstChild);
    }

    game.shipNames.forEach(shipName => {
        const option = document.createElement('option');
        option.textContent = shipName;
        selectShip.appendChild(option)
    });
}

function reset() {

    message.textContent = "";
    inputName.value = "";

    game = null;

    while(playerBoard.firstChild) { playerBoard.removeChild(playerBoard.firstChild); }
    while(computerBoard.firstChild) { computerBoard.removeChild(computerBoard.firstChild); }

    playerCells = [];
    playerCellsClickable = [];
    computerCells = [];
    computerCellsClickable = [];
    placedShips = [];

    while(selectShip.firstChild) { selectShip.removeChild(selectShip.firstChild); }

    const option = document.createElement('option');
    option.textContent = '--|--';
    selectShip.appendChild(option);
    
    submitName.disabled = false;
    inputName.disabled = false;
    selectShip.disabled = true;
    startGameButton.disabled = true;
    nameSubmitted = false;
}

function clickToggleVertical() {

    vertical = !vertical;

    if(vertical) {
        toggleVertical.appendChild(check);
    } else {
        toggleVertical.removeChild(toggleVertical.firstChild);
    }
}

function placeBoat(index) {

    let shipName = selectShip.options[selectShip.selectedIndex].text;
    const messageText = game.placePlayerShip(index, shipName, vertical);

    if(messageText === 'Ship correctly placed.') {
        InsertBoatCell(index, shipName, vertical);
        placedShips.push(shipName);
    }

    message.textContent = messageText;
}

function InsertBoatCell(index, shipName, vertical) {

    let length = game.player.gameBoard.fleet.filter(ship => ship.name === shipName)[0].length;
    let jump = 1;
    if (vertical) { jump = 10; }

    for(let i = 0, cellIndex = index; i < length; i++, cellIndex += jump) {
        playerCells[cellIndex].classList.add('boat');
        playerCellsClickable[cellIndex] = false;
    }
}

function startGame() {

    let messageText = "Game started.";

    game.shipNames.forEach((shipName) => {
        if(!placedShips.includes(shipName)) {
            messageText = "You haven't placed every boat";
        }
    })

    if(messageText === "Game started.") {
        playerCellsClickable = playerCellsClickable.map((cell) => cell = false);
        selectShip.disabled = true;
        toggleVertical.disabled = true;
        loadComputerBoard();
    }

    message.textContent = messageText;
}

function loadComputerBoard() {
    
    let index = 0;

    for(let i = 0; i < 10; i++) {

        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
    
        for(let j = 0; j < 10; j++) {
    
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            cellDiv.id = index;
            computerCellsClickable.push(true);
            cellDiv.addEventListener('click', () => {
                if(computerCellsClickable[Number(cellDiv.id)]) { attackEnemyBoard(Number(cellDiv.id)); }
            });
            index++;
    
            computerCells.push(cellDiv);
            rowDiv.appendChild(cellDiv);
        }
    
        computerBoard.appendChild(rowDiv);
    }
}

function attackEnemyBoard(index) {

    let hit = game.evaluatePlayerMove(index);
    let result = game.computer.gameBoard.board[index];

    computerCells[index].classList.add(result);
    computerCellsClickable[index] = false;
    
    if(!hit) {
        let computerTurn = true;
        while(computerTurn) { computerTurn = attackPlayerBoard(); }
    }

    endGame(game.hasGameEnded());
}

function attackPlayerBoard() {
    
    let randIndex = Math.floor(Math.random() * 100);
    let hit = game.computerMove(randIndex);
    let result = game.player.gameBoard.board[randIndex];

    playerCells[randIndex].classList.add(result);

    return hit;
}

function endGame(messageText) {

    if(messageText !== "") {
        computerCellsClickable = computerCellsClickable.map((cell) => cell = false);
        message.textContent = messageText;
        
    }
}