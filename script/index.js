let settings = document.getElementById("settingsIcon");
let settingsPopUp = document.getElementById("settingsPopUp");


settings.addEventListener("click", () => {
    if (settingsPopUp.classList.contains("noDisplay")) {
        settingsPopUp.classList.remove("noDisplay")
    } else {
        settingsPopUp.classList.add("noDisplay")
    }
})

let board_wrapper = document.getElementById("board-wrapper")

// Generates Subboards
function newSubboard() {
    let newSubboard = document.createElement('div');
    newSubboard.classList.add("board");

    for (let j = 0; j < 9; j++) {
        let newTile = document.createElement('div');
        newTile.classList.add("tile", "tileEmpty");
        // tile.id = i * 9 + j;
        // tile.addEventListener("click", () => {

       
        // })
        subboard.appendChild(newTile);
    }

    return newSubboard;
}

//Sets style of tile based on player who occupies tile
function styleTile(tile, player) {
    tile.classList.remove("tileEmpty");
    tile.classList.add(player == 1 ? "tileCow" : "tileAmogus");
}

//Styles subboard based on winner (-1, 1, 2)

function styleSubboard(subboard, player) {
    subboard.classList.remove(boardEmpty);

    switch (player) {
        case 1:
            subboard.classList.add("boardCow");
            break
        case -1:
            subboard.classList.add("boardAmogus");
            break
        case 2:
            subboard.classList.add("boardDed");
            break
    }
}

// Resets subboard classes
function resetSubboard(subboard) {
    subboard.classList.add(boardEmpty)
    subboard.classList.remove("boardCow", "boardAmogus", "boardDed")
}


// Represents the functionality but not the style of the tic tac toe board
class Board {
    constructor() {
        this.board = [
         0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
        this.isComplete = false;
    }
    



    // Makes a move if possible, throw error if cant make move
    makeMove(index, player) {
        //checks for illegal moves
        if (this.board[index] != 0) {
            throw new Error("bro why u trying to play on an already occupied position u dumb")
        }
        if (this.isComplete) {
            throw new Error("bro why u trying to play on an already completed board u dumb")
        }

        // Make the move
        this.board[index] = player;

        // Check Win
        let winner = this.checkWin();

        //If winner, updates board info because of it
        if (winner != 0) {
            this.isComplete = true
            this.winner = winner
            return winner
        }
        return 0;
    }



    // Function to Check Win
    checkWin() {
        let board = this.board;

        // Forward Diagonal Win
        if (board[0] == board[4] && board[0] == board[8]) {
            return board[0]
        }
 
        // Backwards Diagonal Win
        if (board[2] == board[4] && board[2] == board[6]) {
            return board[2]
        }

        for(let i = 0; i < 3; i++) {
            let col = i * 3

            // Check Horizontal Wins
            if (board[col] == board[col + 1] && board[col] == board[col + 2]) {
                return board[col]
            }

            //Check Verticle Wins
            if (board[i] == board[i + 3] && board[i] == board[i + 6]) {
                return board[i]
            }
        }
        
        // Draw Case
        if (!this.board.includes(0)) {
            return 2
        }

        return 0
    }
}

class TicTacToe {
    constructor() {

        this.display = newSubboard()

        this.tiles = this.display.childNodes

        this.board = new Board()
    }

    // Makes move at specific index and returns result
    makeMove(index, player) {
        let result = this.board.makeMove(index,player)
    }

}





