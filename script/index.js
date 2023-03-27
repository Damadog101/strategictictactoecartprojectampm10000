import { solve, strategicBoardToPosition } from "./AI/solver.js";

let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");

let p1 = parseInt(player1.value);
let p2 = parseInt(player2.value);

const toPlayTexts = {
  1: "Patrick is choosing randomly...",
  2: "Shibe is sniffing around...",
  4: "Raul is thinking...",
  6: "Mr Spicy is calculating...",
  8: "George is pondering...",
};

const playerIcons = {
  0: "/images/anonymous.png",
  1: "/images/patrick.png",
  2: "/images/shibe.png",
  4: "/images/raul.png",
  6: "/images/spicy.jpg",
  8: "/images/george.png",
};

player1.addEventListener("change", () => {
  let p1Img = document.getElementById("selectImgOne");
  p1 = parseInt(player1.value);
  p1Img.src = playerIcons[p1];

  if (p1 == 0) {
    p1Img.classList.add("humanImgOne");
  } else {
    p1Img.classList.remove("humanImgOne");
  }
});

player2.addEventListener("change", () => {
  let p2Img = document.getElementById("selectImgTwo");
  p2 = parseInt(player2.value);
  p2Img.src = playerIcons[p2];

  if (p2 == 0) {
    p2Img.classList.add("humanImgTwo");
  } else {
    p2Img.classList.remove("humanImgTwo");
  }
});

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
  board.winner = undefined;

  board.reset();
});

// Generates Subboards
function newSubboard(i) {
  let newSubboard = document.createElement("div");
  newSubboard.classList.add("board", "subboard", "inPlay");
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

  tile.classList.add("recent");

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
  tile.classList.remove("tilePlayerOne", "tilePlayerTwo", "recent");
}

// Represents the functionality but not the style of the tic tac toe board
class Board {
  constructor() {
    this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.isComplete = false;
  }

  resetIndex() {
    this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.isComplete = false;
    // console.log(this.board)
    // console.log(this.isComplete)
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
    if (
      board[0] != 0 &&
      board[0] == board[4] &&
      board[0] == board[8] &&
      board[0] != 2
    ) {
      return board[0];
    }

    // Backwards Diagonal Win
    if (board[2] != 0 && board[2] == board[4] && board[2] == board[6]) {
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
        return board[col];
      }

      //Check Verticle Wins
      if (
        board[i] != 0 &&
        board[i] == board[i + 3] &&
        board[i] == board[i + 6]
      ) {
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

  async makeMove(subboard, index) {
    // Removes the inPlay class from all subBoards

    // Throws error if you play on the wrong board
    if (this.subboard != null) {
      if (subboard != this.subboard) {
        alert("You tried to play on the wrong board!");
        throw new Error("You tried to play on the wrong board!");
      }
    }

    for (let tile of tilesArr) {
      tile.classList.remove("recent");
    }

    //removes inPlay class from old subboards after each turn
    for (let subB in this.subboards) {
      let curBoard = document.getElementById("0" + subB);
      curBoard.classList.remove("inPlay");
    }

    // Make move and store move result
    let result = this.subboards[subboard].makeMove(index, this.player);
    this.player = -this.player;

    //Make the rotating tile to display whos turn it is
    let p1Turn = document.getElementById("playerOneTurn");
    let p2Turn = document.getElementById("playerTwoTurn");
    let playersBox = document.getElementById("playersBox");

    p1Turn.classList.remove("rotate");
    p2Turn.classList.remove("rotate");

    if (this.player == 1) {
      p1Turn.classList.add("rotate");
      playersBox.classList.remove("colorPlayerTwo");
      playersBox.classList.add("colorPlayerOne");

      if (p1 == "0") {
        playersBox.innerHTML = "Player 1 to Play...";
      } else {
        playersBox.innerHTML = toPlayTexts[p1];
      }
    } else if (this.player == -1) {
      p2Turn.classList.add("rotate");
      playersBox.classList.remove("colorPlayerOne");
      playersBox.classList.add("colorPlayerTwo");

      if (p2 == "0") {
        playersBox.innerHTML = "Player 2 to Play...";
      } else {
        playersBox.innerHTML = toPlayTexts[p2];
      }
    } else {
      p1Turn.classList.remove("rotate");
      p2Turn.classList.remove("rotate");
      playersBox.classList.remove("colorPlayerOne", "colorPlayerTwo");
    }

    //If a player won that board because of this, run this part
    if (result != 0) {
      // track move on larger board
      let winner = this.board.makeMove(subboard, result);

      //if player won game do this
      if (winner) {
        //alert it

        switch (winner) {
          case 1:
            playersBox.classList.add("colorPlayerOne");
            playersBox.classList.remove("colorPlayerTwo");

            playersBox.innerHTML = `Player 1 won the game!`;

            break;
          case -1:
            playersBox.classList.add("colorPlayerTwo");
            playersBox.classList.remove("colorPlayerOne");

            playersBox.innerHTML = `Player 2 won the game!`;

            break;
          case 2:
            playersBox.classList.add("colorDraw");
            playersBox.classList.remove("colorPlayerOne", "colorPlayerTwo");

            playersBox.innerHTML = `The game was a draw!`;
            break;
        }
        return winner;
      }
    }
    // Set the subboard to be index ONLY IF subboard is empty. Otherwise set it to null
    this.subboard = this.board["board"][index] == 0 ? index : null;

    //gives the sub-boards the inPlay class when they the next
    this.subboards.forEach((board, index) => {
      if (
        (this.subboard != null && index != this.subboard) ||
        board.board.isComplete
      ) {
        return;
      }

      board.display.classList.add("inPlay");
    });

    if (
      ((p1 != 0 && this.player == 1) || (p2 != 0 && this.player == -1)) &&
      !this.board.isComplete
    ) {
      let P = strategicBoardToPosition(this);
      await new Promise((r) => setTimeout(r, 100));

      if ((p1 == 1 && this.player == 1) || (p2 == 1 && this.player == -1)) {
        await new Promise((r) => setTimeout(r, 500));
        let moves = P.getLegalMoves();
        let randMove = moves[Math.floor(Math.random() * moves.length)];
        this.makeMove(randMove[0], randMove[1]);
        return 0;
      }

      let move = solve(P, this.player == 1 ? p1 : p2);
      this.makeMove(move[0], move[1]);
    }

    return 0;
  }

  reset() {
    this.subboards.forEach((subboard) => {
      subboard.board.resetIndex();
      subboard.display.classList.add("inPlay");
    });
    this.board = new Board();
    this.player = 1;
    this.subboard = null;
    console.log(p1);
    if (p1 != 0) {
      let P = strategicBoardToPosition(this);
      let move = solve(P, p1);
      this.makeMove(move[0], move[1]);
    }
  }
}

// Reference container
let boardWrapper = document.getElementById("board-wrapper");

// Make new strategic board contained by container
let board = new StrategicBoard(boardWrapper);

// let subBoardsArr = document.querySelectorAll(".subboard")
let tilesArr = document.querySelectorAll(".tile");
for (let tile of tilesArr) {
  tile.addEventListener("click", () => {
    let subboard = Math.floor(tile.id / 9);
    let index = tile.id % 9;
    board.makeMove(subboard, index);
  });
}
