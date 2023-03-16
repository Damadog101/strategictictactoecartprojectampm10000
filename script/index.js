// let settings = document.getElementById("settingsIcon");
// let settingsPopUp = document.getElementById("settingsPopUp");
// settings.addEventListener("click", () => {
// 	if (settingsPopUp.classList.contains("noDisplay")) {
// 		settingsPopUp.classList.remove("noDisplay");
// 	} else {
// 		settingsPopUp.classList.add("noDisplay");
// 	}
// });

function playerOneDropdown() {
  document.getElementById("playerOneDropdown").classList.toggle("noDisplay");
}
function playerTwoDropdown() {
  document.getElementById("playerTwoDropdown").classList.toggle("noDisplay");
}
function settingsDropDown() {
  document.getElementById("settingsPopUp").classList.toggle("noDisplay");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("noDisplay")) {
        openDropdown.classList.remove("noDisplay");
      }
    }
  }
};

let restartButton = document.getElementById("restart");

//Restarts Game
restartButton.addEventListener("click", () => {
  let subBoardsArr = document.querySelectorAll(".subboard");
  for (let subboard of subBoardsArr) {
    subboard.classList.remove("inPlay");
  }
  resetSubboard();

  for (let tile of tilesArr) {
    resetTiles(tile);
  }

  board.player = 1;
  board.subboard = null;
  board.reset();
  board.winner = 0;
});

// Generates Subboards
function newSubboard(i) {
  let newSubboard = document.createElement("div");
  newSubboard.classList.add("board", "subboard");
  newSubboard.id = "0" + i;
  for (let j = 0; j < 9; j++) {
    let newTile = document.createElement("div");

    newTile.classList.add("tile", "tileEmpty");
    newTile.id = i * 9 + j;
    newSubboard.appendChild(newTile);
  }

  return newSubboard;
}

//Sets style of tile based on player who occupies tile
function styleTile(tile, player) {
  tile.classList.remove("tileEmpty");
  tile.classList.add(player == 1 ? "tilePlayerOne" : "tilePlayerTwo");
}

function playerOneWinner() {
  let playerOneWin = document.createElement("div");
  playerOneWin.classList.add("boardPlayerOne");
  return playerOneWin;
}

function playerTwoWinner() {
  let playerTwoWin = document.createElement("div");
  playerTwoWin.classList.add("boardPlayerTwo");
  return playerTwoWin;
}

function drawnGame() {
  let draw = document.createElement("div");
  draw.classList.add("boardDraw");
  return draw;
}

//Styles subboard based on winner (-1, 1, 2)

function styleSubboard(subboard, player) {
  switch (player) {
    case 1:
      subboard.appendChild(playerOneWinner());
      break;
    case -1:
      subboard.appendChild(playerTwoWinner());
      break;
    case 2:
      subboard.appendChild(drawnGame());
      break;
  }
}

function clear_all(items) {
  items.forEach((item) => {
    item.remove();
  });
}

// Resets subboard classes
function resetSubboard() {
  let boardPlayerOne = document.querySelectorAll(".boardPlayerOne");
  let boardPlayerTwo = document.querySelectorAll(".boardPlayerTwo");
  let boardDraw = document.querySelectorAll(".boardDraw");

  clear_all(boardPlayerOne);
  clear_all(boardPlayerTwo);
  clear_all(boardDraw);
}
// Resets tiles classes
function resetTiles(tile) {
  tile.classList.add("tileEmpty");
  tile.classList.remove("tilePlayerOne", "tilePlayerTwo");
}

// Represents the functionality but not the style of the tic tac toe board
class Board {
  constructor() {
    this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.isComplete = false;
  }

  resetIndex() {
    this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  // Makes a move if possible, throw error if cant make move
  makeMove(index, player) {
    //checks for illegal moves
    if (this.board[index] != 0) {
      // alert(""You tried to play on an already occupied tile!"")
      throw new Error("You tried to play on an already occupied tile!");
    }
    if (this.isComplete) {
      alert("You tried to play on an already completed board!");
      throw new Error("You tried to play on an already completed board!");
    }

    // Make the move
    this.board[index] = player;

    // Check Win
    let winner = this.checkWin();

    //If winner, updates board info because of it
    if (winner != 0) {
      this.isComplete = true;
      this.winner = winner;
      return winner;
    }

    return 0;
  }

  // Function to Check Win
  checkWin() {
    let board = this.board;

    // Forward Diagonal Win
    if (board[0] != 0 && board[0] == board[4] && board[0] == board[8]) {
      console.log(
        `FW Diagonal Wins Check: ${board[0]}, ${board[4]}, ${board[8]} `
      );
      return board[0];
    }

    // Backwards Diagonal Win
    if (board[2] != 0 && board[2] == board[4] && board[2] == board[6]) {
      console.log(
        `BW Diagonal Wins Check: ${board[2]}, ${board[4]}, ${board[6]} `
      );
      return board[2];
    }

    for (let i = 0; i < 3; i++) {
      let col = i * 3;

      // Check Horizontal Wins
      if (
        board[col] != 0 &&
        board[col] == board[col + 1] &&
        board[col] == board[col + 2]
      ) {
        console.log(
          `Horizontal: ${board[col]}, ${board[col + 1]}, ${board[col + 2]} `
        );
        return board[col];
      }

      //Check Verticle Wins
      if (
        board[i] != 0 &&
        board[i] == board[i + 3] &&
        board[i] == board[i + 6]
      ) {
        console.log(
          `Verticle Wins Check: ${board[i]}, ${board[i + 3]}, ${board[i + 6]} `
        );
        return board[i];
      }
    }

    // Draw Case
    if (!this.board.includes(0)) {
      return 2;
    }

    return 0;
  }
}

class TicTacToe {
  constructor(i) {
    this.display = newSubboard(i);

    this.tiles = this.display.childNodes;

    this.board = new Board();
  }

  // Makes move at specific index and returns result
  makeMove(index, player) {
    let result = this.board.makeMove(index, player);
    // console.log(result);

    styleTile(this.tiles[index], player);

    if (result != 0) {
      styleSubboard(this.display, result);
    }

    return result;
  }
}

//The Large Strategic Board Itself
class StrategicBoard {
  // Container what will contain the subboards
  constructor(container) {
    // Creates array of 9 emtpy spaces, the following operation is run on every empty space
    this.subboards = new Array(9).fill(null).map((_, i) => {
      // Make New Subboard
      let newBoard = new TicTacToe(i);
      // Append its Visual Reference
      container.appendChild(newBoard.display);

      //Return the board to the subBoards Array

      return newBoard;
    });

    this.board = new Board();

    this.player = 1;
    this.subboard = null;
  }

  makeMove(subboard, index) {
    // Removes the inPlay class from all subBoards

    // Throws error if you play on the wrong board
    if (this.subboard != null) {
      if (subboard != this.subboard) {
        alert("You tried to play on the wrong board!");
        throw new Error("You tried to play on the wrong board!");
      }
    }

    for (let subB in this.subboards) {
      let curBoard = document.getElementById("0" + subB);
      curBoard.classList.remove("inPlay");
    }

    // Make move and store move result
    let result = this.subboards[subboard].makeMove(index, this.player);
    this.player = -this.player;

    //If a player won that board because of this, run this part
    if (result != 0) {
      console.log(result);
      // track move on larger board
      let winner = this.board.makeMove(subboard, -this.player);

      //if player won game do this
      if (winner) {
        //alert it
        switch (winner) {
          case 1:
            alert(`Player 1 won the game`);
            break;
          case -1:
            alert(`Player 2 won the game`);
            break;
          case 2:
            alert(`The game was a Draw`);
            break;
        }
        return winner;
      }
    }

    // Set the subboard to be index ONLY IF subboard is empty. Otherwise set it to null
    this.subboard = this.board["board"][index] == 0 ? index : null;

	new_ai.setState(board);

	if (this.player == -1) {
		let bestMove = new_ai.getBestMove();
		this.makeMove(bestMove[1], bestMove[0]);
	}

    this.subboards.forEach((board, index) => {
      if (
        (this.subboard != null && index != this.subboard) ||
        board.board.isComplete
      ) {
        return;
      }

      board.display.classList.add("inPlay");
    });

    return 0;
  }

  reset() {
    this.subboards.forEach((subboard) => {
      subboard.board.resetIndex();
      subboard.board.isComplete = false;
    });
  }
}

// Minimax AI Implementation

class AIBoard {
  constructor() {
    this.evaluation = 0;

    this.moveHistory = [];
    this.legalMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    // Used for scoring boards
    this.columnTally = [0, 0, 0];
    this.rowTally = [0, 0, 0];
    // [0] = forward diagonal, [1] = backwards diagonal
    this.diagonalTally = [0, 0];

    this.complete = false;
  }

  makeMove(index, player) {
    let column = index % 3;
    let row = Math.floor(index / 3);

    this.columnTally[column] += player;
    this.rowTally[row] += player;

    if ((column + row) % 2 == 0) {
      this.diagonalTally[0] += player;
    }

    if (column + row == 2) {
      this.diagonalTally[1] += player;
    }

    this.moveHistory.push([index, player]);
    this.legalMoves.splice(this.legalMoves.indexOf(index), 1);
  }

  undo() {
    this.complete = false;

    let move = this.moveHistory.pop();
    let index = move[0];
    let player = move[1];

    let column = index % 3;
    let row = Math.floor(index / 3);

    this.columnTally[column] -= player;
    this.rowTally[Math.floor(row)] -= player;

    if ((column + row) % 2 == 0) {
      this.diagonalTally[0] -= player;
    }

    if (column + row == 2) {
      this.diagonalTally[1] -= player;
    }

    this.legalMoves.push(index);
  }

  score(t) {
    return t == 2 ? 0 : Math.floor(10 ** (Math.abs(t) - 1)) * (t < 0 ? -1 : 1);
  }

  evaluate() {
    let score = 0;

    for (let i = 0; i < 3; i++) {
      let ct = this.columnTally[i];
      let rt = this.rowTally[i];

      score += this.score(ct);
      score += this.score(rt);
    }

    score += this.score(this.diagonalTally[0]);
    score += this.score(this.diagonalTally[1]);

    this.evaluation = score;

    if (score >= 100 || score <= -100) {
      this.complete = true;
    }

    return score;
  }

  // Copies a Board types information into the AI board type.
  copy(board) {
    board.forEach((tile, i) => {
      if (tile != 0) {
        this.makeMove(i, tile);
      }
    });
	this.evaluate();
  }
}

// The brain for the AI. It takes in a Strategicboard type and converts it into information that it can use efficiently.
class Brain {
  constructor() {
    this.currentboard = null;
    this.player = 1;

	this.moveHistory = [];

    this.subboards = new Array(9).fill(null).map((_) => new AIBoard());
    this.board = new AIBoard();
  }

  setState(strategicboard) {
	this.subboards = new Array(9).fill(null).map((_) => new AIBoard());

    strategicboard.subboards.forEach((subboard, i) => {
      this.subboards[i].copy(subboard.board.board);
    });

    this.board.copy(strategicboard.board.board);
    this.player = strategicboard.player;
	this.currentboard = strategicboard.subboard;
    this.evaluate();
  }

  makeMove(index, subboard) {
    if (this.currentboard) {
      subboard = this.currentboard;
    }

    let boardToPlay = this.subboards[subboard];

    boardToPlay.makeMove(index, this.player);
    boardToPlay.evaluate();
	if (boardToPlay.complete) {
		this.board.makeMove(subboard, this.player);
		console.log(this.board);
	}
	this.player = -this.player;

	// Store where they played, and if that board was completed
	this.moveHistory.push([subboard, boardToPlay.complete ? true : false]);

    if (this.subboards[index].complete) {
      this.currentboard = null;
    } else {
      this.currentboard = index;
    }
  }

  undo() {
	let lastMove = this.moveHistory.pop();

	this.subboards[lastMove[0]].undo();

	if (lastMove[1]) {
		this.board.undo();
	}
  }

  getLegalMoves() {
	// If the game is over, then there are no moves to be made
	if (this.board.complete) {
		return [];
	}

	let moves = [];
	let boardsToCheck = this.currentboard != null ? [this.currentboard] : this.board.legalMoves;

	// For every board that can be played on, 
	for (let i = 0; i < boardsToCheck.length; i++) {
		// The subboard which moves are currently being retrieved
		let movesSubboard = boardsToCheck[i];
		let submoves = this.subboards[movesSubboard].legalMoves;

		for (let j = 0; j < submoves.length; j++) {
			moves.push([submoves[j], movesSubboard]);
		}
	}

	return moves;
  }

  evaluate() {
	// If somebody won the game, return a ridiculous number
	if (this.board.complete) {
		return this.board.evaluation > 0 ? 1000000 : -1000000;
	}

	// Otherwise return the sum of the evaluation of all of the boards;
	let score = 0;

	this.subboards.forEach(board => {
		score += board.evaluation;
	})

	score += this.board.evaluation * 10;

	return score;
  }

	// Move is the move that should be made on the turn
	// Depth is how many moves deep the AI will search
  minimax(move, depth, player, alpha = -Infinity, beta = Infinity) {
	this.makeMove(move[0], move[1]);

	if (depth == 0 || this.board.complete) {
		return this.evaluate();
	}

	if (player == 1) {
		let value = -Infinity;
		let moves = this.getLegalMoves();

		for (let i = 0; i < moves.length; i++) {
			value = Math.max(value, this.minimax(moves[i], depth - 1, player * -1, alpha, beta))
			alpha = Math.max(value, alpha);
			this.undo();

			if (beta <= alpha) {
				break
			}
		}

		return value;
	} else {
		let value = Infinity;
		let moves = this.getLegalMoves();

		for (let i = 0; i < moves.length; i++) {
			value = Math.min(value, this.minimax(moves[i], depth - 1, player * -1, alpha, beta));
			beta = Math.min(value, beta);
			this.undo();

			if (beta <= alpha) {
				break
			}
		}

		return value;
	}
  }

  getBestMove() {
	let moves = this.getLegalMoves();
	let bestMoveIndex = 0;
	let bestMoveValue = 0;

	for (let i = 0; i < moves.length; i++) {
		let moveValue = this.minimax(moves[i], 5, this.player);
		
		if (moveValue > bestMoveValue) {
			bestMoveValue = moveValue;
			bestMoveIndex = i;
		}
	}
	
	return moves[bestMoveIndex];
  }
}

// Reference container
let boardWrapper = document.getElementById("board-wrapper");

// Make new strategic board contained by container
let board = new StrategicBoard(boardWrapper);

let new_ai = new Brain();

// let subBoardsArr = document.querySelectorAll(".subboard")
let tilesArr = document.querySelectorAll(".tile");
for (let tile of tilesArr) {
  tile.addEventListener("click", () => {
    let subboard = Math.floor(tile.id / 9);
    let index = tile.id % 9;
    board.makeMove(subboard, index);
  });
}
