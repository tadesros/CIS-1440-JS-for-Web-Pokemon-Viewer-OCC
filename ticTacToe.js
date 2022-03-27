"use strict";

//*DATA*/
//An array of each cell in the board
let gameMoves = [null, null, null, null, null, null, null, null, null];
//Object to hold game data
let gameData = {
	gameMode: null,
	playerSymbol: [],
	currentPlayerArr: [],
	currentPlayerSymbol: null,
	currentPlayer: null,
	player1Name: null,
	player2Name: null,
	gameTime: null,
};
//Element Selectors
const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("btnRestart");
const playAgainBtn = document.getElementById("btnPlayAgain");
const elStartBtn = document.getElementById("btnStartGame");
const elGameStartTxt = document.getElementById("gameStartTxt");
const elGameBoard = document.getElementById("gameBoard");
const elMainMenu = document.querySelector(".mainMenu");
const elGameScreen = document.querySelector(".gameScreen");
const timerValue = document.getElementById("timeValue");
const radioChoice = document.querySelectorAll('input[name="playerChoice"]');
//Input text boxes
const firstTextInput = document.getElementById("firstEntry");
const secondTextInput = document.getElementById("secondEntry");

let timerID;

//*PAGE LOAD EVENT LISTENER*/
document.addEventListener("DOMContentLoaded", () => {
	//Show Main Menu hide game board
	hideMainMenu(false);
	//Add event listener for name text box show hid
	let radioValue;
	radioChoice.forEach((radio) => {
		radio.addEventListener("click", function () {
			radioValue = radio.value;
			if (radioValue == "playerVplayer") {
				//Unlock computer name field
				console.log("Player v player");
				secondTextInput.value = "Player 2";
				secondTextInput.disabled = false;
			} else {
				//Lock Computer name and put in computer name
				console.log("PLayer v computer");
				secondTextInput.value = "Computer";
				secondTextInput.disabled = true;
			}
		});
	});
	elStartBtn.addEventListener("click", startGame);
});

//*FUNCTIONS*/
//Primary movement functions
/**
 *  Function: Start Game
 */
function startGame() {
	//Get game mode choice
	gameData.gameMode = document.querySelector(
		'input[name="playerChoice"]:checked'
	).value;

	if (gameData.gameMode == "playerVplayer") {
		gameData.player1Name = firstTextInput.value;
		gameData.player2Name = secondTextInput.value;
	} else {
		gameData.player2Name = firstTextInput.value;
		gameData.player1Name = secondTextInput.value;
	}

	//Reset GameTime
	gameData.gameTime = 0;

	timerValue.textContent = gameData.gameTime;

	//Hide main menu-show game board
	hideMainMenu(true);
	//Hide play again button
	showPlayAgainBtn(false);
	//Show restart button
	showRestartBtn(true);
	//Get and set starting symbol
	setStartingSymbol();
	//Get and set starting Player
	setRandomStartingPlayer();
	//Clear game board
	clearBoard();
	//Reset move array - reset to null
	resetMoves();
	//Attach click event listeners to all cells
	addCellClickEvents();
	//Lock board
	lockBoard(true);
	console.log(gameData);
	//Check game mode update header
	firstMove();
	//Add click event listener to restart button
	restartBtn.addEventListener("click", resetGame);
	//Add click event listener to play again button
	playAgainBtn.addEventListener("click", resetGame);
	//Start Timer
	timerID = setInterval(gameTimer, 1000);
}
/**
 * Function: resetGame
 */
function resetGame() {
	//Hide board show main menu
	hideMainMenu(false);
}
/**
 * Function: cellClick
 * @param {id of the clicked cell} clickedCell
 */
function cellClick(clickedCell) {
	//ID of clicked cell
	let clickedId = clickedCell.target.id;
	//Check if that space is empty in our array of moves
	if (!gameMoves[clickedId]) {
		//Empty space update move array
		gameMoves[clickedId] = gameData.currentPlayerSymbol;
		//Update selected cell with appropriate symbol
		clickedCell.target.innerText = gameData.currentPlayerSymbol;
		//Check if the current player has won
		if (winner()) {
			//Update Header
			//Update current player
			if (gameData.currentPlayer == 0) {
				//Update Header
				elGameStartTxt.innerHTML = `${gameData.player1Name}: ${gameData.currentPlayerSymbol} Won!`;
			} else {
				//Update Header
				elGameStartTxt.innerHTML = `${gameData.player2Name}: ${gameData.currentPlayerSymbol} Won!`;
			}
			//Show play again button.]
			showPlayAgainBtn(true);
			showRestartBtn(false);
			lockBoard(true);
			clearInterval(timerID);
		}
		//Check for a tie
		else if (allNotNull()) {
			elGameStartTxt.innerHTML = `The game is a tie.`;
			//Show play again button
			showPlayAgainBtn(true);
			showRestartBtn(false);
			clearInterval(timerID);
		}
		//No-one won go again check if computer player turn
		else {
			//Update current player and symbol
			if (gameData.currentPlayerSymbol == "X") {
				gameData.currentPlayerSymbol = "O";
			} else {
				gameData.currentPlayerSymbol = "X";
			}
			//Update current player
			if (gameData.currentPlayer == 0) {
				gameData.currentPlayer = 1;
				//Update Header
				elGameStartTxt.innerHTML = `It is ${gameData.player2Name}: ${gameData.currentPlayerSymbol}'s  turn`;
			} else {
				gameData.currentPlayer = 0;
				//Update Header
				elGameStartTxt.innerHTML = `It is ${gameData.player1Name}: ${gameData.currentPlayerSymbol}'s  turn`;
			}
			//Check gameMode if it's computer player
			if (gameData.gameMode == "playerVcomputer") {
				//Cpu turn
				cpuTakeTurn();
			}
		}
	}
}
/**
 *  cpuTakeTurn
 */
function cpuTakeTurn() {
	//Lock the board
	lockBoard(true);

	//Get a valid computer turn
	let move = getCpuMove();
	//Mimic the computer slowing down to take it's turn
	//Not really needed but looks better for gameplay
	setTimeout(() => {
		gameMoves[move] = gameData.currentPlayerSymbol;
		//Update selected cell with appropriate symbol
		cells[move].innerText = gameData.currentPlayerSymbol;
		//Check for a win
		//Check if the current player has won
		if (winner()) {
			//Update Header
			//Update current player
			if (gameData.currentPlayer == 0) {
				//Update Header
				elGameStartTxt.innerHTML = `${gameData.player1Name}: ${gameData.currentPlayerSymbol} Won!`;
			} else {
				//Update Header
				elGameStartTxt.innerHTML = `${gameData.player2Name}: ${gameData.currentPlayerSymbol} Won!`;
			}
			//Show play again button.]
			showPlayAgainBtn(true);
			showRestartBtn(false);
			lockBoard(true);
			clearInterval(timerID);
		}
		//Check for a tie
		else if (allNotNull()) {
			elGameStartTxt.innerHTML = `The game is a tie.`;
			//Show play again button
			showPlayAgainBtn(true);
			showRestartBtn(false);
			lockBoard(true);
			clearInterval(timerID);
		}
		//No-one won unlock board update
		else {
			//Update current player and symbol
			if (gameData.currentPlayerSymbol == "X") {
				gameData.currentPlayerSymbol = "O";
			} else {
				gameData.currentPlayerSymbol = "X";
			}
			//Update current player
			if (gameData.currentPlayer == 0) {
				gameData.currentPlayer = 1;
				//Update Header
				elGameStartTxt.innerHTML = `It is ${gameData.player2Name}: ${gameData.currentPlayerSymbol}'s  turn`;
			} else {
				gameData.currentPlayer = 0;
				//Update Header
				elGameStartTxt.innerHTML = `It is ${gameData.player1Name}: ${gameData.currentPlayerSymbol}'s  turn`;
			}
			lockBoard(false);
		}
	}, 1000);
}
/**
 * firstMove
 */
function firstMove() {
	let move;

	//If Game Mode is Player V. Computer and Computer goes first
	if (
		gameData.gameMode == "playerVcomputer" &&
		gameData.currentPlayerSymbol == "X"
	) {
		//Update Header
		elGameStartTxt.innerHTML = `${gameData.player1Name}: ${gameData.currentPlayerSymbol}'s goes first`;

		//Lock Board
		lockBoard(true);

		//Get computer move
		move = getCpuMove();
		//Update Game Board
		setTimeout(() => {
			gameMoves[move] = gameData.currentPlayerSymbol;
			//Update selected cell with appropriate symbol
			cells[move].innerText = gameData.currentPlayerSymbol;
			//Update current player to new values
			updateCurrentPlayer();
			//Update Game Banner
			if (gameData.currentPlayer == 0) {
				//Update Header
				elGameStartTxt.innerHTML = `It is ${gameData.player1Name}: ${gameData.currentPlayerSymbol}'s  turn`;
			} else {
				//Update Header

				elGameStartTxt.innerHTML = `It is ${gameData.player2Name}: ${gameData.currentPlayerSymbol}'s  turn`;
			}

			//Unlock Board
			lockBoard(false);
		}, 1000);
	}
	//Otherwise human player goes first
	else {
		//Update Header for first move
		//Update current player
		if (gameData.currentPlayer == 0) {
			//	gameData.currentPlayer = 1;
			//Update Header
			elGameStartTxt.innerHTML = `It is ${gameData.player1Name}: ${gameData.currentPlayerSymbol}'s  turn`;
		} else {
			//	gameData.currentPlayer = 0;
			//Update Header
			elGameStartTxt.innerHTML = `It is ${gameData.player2Name}: ${gameData.currentPlayerSymbol}'s  turn`;
		}
		//Unlock Board so they can click
		lockBoard(false);
	}
}
/**
 * Add Cell Click Events
 */
function addCellClickEvents() {
	for (let i = 0; i < cells.length; i++) {
		cells[i].addEventListener("click", cellClick);
	}
}
/**
 * Set starting symbol
 */
function setStartingSymbol() {
	//If game mode is playerVcomputer set Player to X and computer to 0
	//In this game computer will be player 2
	if (gameData.gameMode == "playerVcomputer") {
		gameData.playerSymbol[0] = "X";
		gameData.playerSymbol[1] = "O";
		//gameData.player1Name = "Computer Player 1";
	} else {
		//Randomly select which player will have X and O
		let randomPlayer = Math.round(Math.random());

		if (randomPlayer === 0) {
			gameData.playerSymbol = ["X", "O"];
		} else {
			gameData.playerSymbol = ["O", "X"];
		}
		//	gameData.player1Name = "Player 1";
	}

	//Player 2 always Human Player
	//	gameData.player2Name = "Player 2";
}
/**
 * Set starting symbol
 */
function setRandomStartingPlayer() {
	let randomStartPlayer = Math.round(Math.random());

	if (randomStartPlayer === 0) {
		gameData.currentPlayer = 0;
		gameData.currentPlayerSymbol = gameData.playerSymbol[0];
	} else {
		gameData.currentPlayer = 1;
		gameData.currentPlayerSymbol = gameData.playerSymbol[1];
	}
}
/**
 * Clear Board
 */
function clearBoard() {
	for (let i = 0; i < cells.length; i++) {
		cells[i].innerText = "";
		cells[i].style.backgroundColor = "white";
		cells[i].style.color = "black";
	}
}
/**
 * function: winner()
 */
function winner() {
	//Check current player if they have top left corner.
	if (gameMoves[0] == gameData.currentPlayerSymbol) {
		//Check Top
		if (
			gameMoves[1] == gameData.currentPlayerSymbol &&
			gameMoves[2] == gameData.currentPlayerSymbol
		) {
			console.log(`${gameData.currentPlayer} wins top row`);
			//Color winning move red?
			cells[0].style.color = "red";
			cells[1].style.color = "red";
			cells[2].style.color = "red";

			return true;
		}
		//Check left
		if (
			gameMoves[3] == gameData.currentPlayerSymbol &&
			gameMoves[6] == gameData.currentPlayerSymbol
		) {
			console.log(`${gameData.currentPlayer} wins left`);

			//Color winning move red?
			cells[0].style.color = "red";
			cells[3].style.color = "red";
			cells[6].style.color = "red";

			return true;
		}
		//Check Diagonally from upper right
		if (
			gameMoves[4] == gameData.currentPlayerSymbol &&
			gameMoves[8] == gameData.currentPlayerSymbol
		) {
			console.log(`${gameData.currentPlayer} wins diagonally`);

			//Color winning move red?
			cells[0].style.color = "red";
			cells[4].style.color = "red";
			cells[8].style.color = "red";

			return true;
		}
	}
	//Check Center
	if (gameMoves[8] == gameData.currentPlayerSymbol) {
		//Check
		if (
			gameMoves[2] == gameData.currentPlayerSymbol &&
			gameMoves[5] == gameData.currentPlayerSymbol
		) {
			console.log(`${gameData.currentPlayer} wins on the right`);

			//Color winning move red?
			cells[8].style.color = "red";
			cells[2].style.color = "red";
			cells[5].style.color = "red";

			return true;
		}
		//Check Bottom Row
		if (
			gameMoves[6] == gameData.currentPlayerSymbol &&
			gameMoves[7] == gameData.currentPlayerSymbol
		) {
			console.log(`${gameData.currentPlayer} wins on Bottom`);

			//Color winning move red?
			cells[8].style.color = "red";
			cells[6].style.color = "red";
			cells[7].style.color = "red";

			return true;
		}
	}
	//Check Middle
	if (gameMoves[4] == gameData.currentPlayerSymbol) {
		//Check
		if (
			gameMoves[1] == gameData.currentPlayerSymbol &&
			gameMoves[7] == gameData.currentPlayerSymbol
		) {
			console.log(`${gameData.currentPlayer} vertically in the middle`);

			//Color winning move red?
			cells[4].style.color = "red";
			cells[1].style.color = "red";
			cells[7].style.color = "red";

			return true;
		}
		//Check Across
		if (
			gameMoves[3] == gameData.currentPlayerSymbol &&
			gameMoves[5] == gameData.currentPlayerSymbol
		) {
			console.log(`${gameData.currentPlayer} wins horizontally`);

			//Color winning move red?
			cells[4].style.color = "red";
			cells[3].style.color = "red";
			cells[5].style.color = "red";

			return true;
		}
		//Check Diagonal
		if (
			gameMoves[2] == gameData.currentPlayerSymbol &&
			gameMoves[6] == gameData.currentPlayerSymbol
		) {
			console.log(`${gameData.currentPlayer} wins diagonal`);

			//Color winning move red?
			cells[4].style.color = "red";
			cells[2].style.color = "red";
			cells[6].style.color = "red";
			return true;
		}
	}
	return false;
}
/**
 * Get Computers Move check if valid return if valid only
 */
function getCpuMove() {
	let randomMove;
	//Continue in loop until a valid move if found
	do {
		//get a random move
		randomMove = getRndInteger(0, 8);
	} while (gameMoves[randomMove]);

	console.log(`${randomMove} +  is a good move`);

	return randomMove;
}
/**
 * getRndInteger
 * @param {*} min
 * @param {*} max
 * @returns
 */
function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * lockUnlockBoard
 * @param {*} lockState
 */
function lockBoard(lockState) {
	//If true lock the board (uncickable)
	if (lockState) {
		//add unclickable class
		elGameBoard.classList.add("unclickable");
	}
	//Make the board active (clickable)
	else {
		//remove unclickable class
		elGameBoard.classList.remove("unclickable");
	}
}
/**
 * Function: hideMainMenu
 * @param {boolean} showHideFlag
 */
function hideMainMenu(showHideFlag) {
	if (showHideFlag) {
		elMainMenu.classList.add("hide");
		elGameScreen.classList.remove("hide");
	} else {
		elMainMenu.classList.remove("hide");
		elGameScreen.classList.add("hide");
	}
}
/**
 * Function: showPlayAgainBtn
 * @param {boolean} showHideFlag
 */
function showPlayAgainBtn(showHideFlag) {
	if (showHideFlag) {
		playAgainBtn.classList.remove("hide");
	} else {
		playAgainBtn.classList.add("hide");
	}
}
/**
 * Function: showRestartBtn
 * @param {boolean} showHideFlag
 */
function showRestartBtn(showHideFlag) {
	if (showHideFlag) {
		restartBtn.classList.remove("hide");
	} else {
		restartBtn.classList.add("hide");
	}
}
/**
 *
 */
function updateCurrentPlayer() {
	//Update current player and symbol
	if (gameData.currentPlayerSymbol == "X") {
		gameData.currentPlayerSymbol = "O";
	} else {
		gameData.currentPlayerSymbol = "X";
	}
	//Update current player
	if (gameData.currentPlayer == 0) {
		gameData.currentPlayer = 1;
	} else {
		gameData.currentPlayer = 0;
	}
}
/**
 * Function: resetMoves
 */
function resetMoves() {
	gameMoves = [null, null, null, null, null, null, null, null, null];
}
//Check if all values are not null
function allNotNull() {
	return gameMoves.every((element) => element != null);
}
function gameTimer() {
	gameData.gameTime = gameData.gameTime + 1;
	timerValue.textContent = gameData.gameTime;
	console.log(gameData.gameTime);
}
