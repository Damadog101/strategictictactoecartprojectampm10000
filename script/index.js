// let settings = document.getElementById("settingsIcon");
// let settingsPopUp = document.getElementById("settingsPopUp");
// settings.addEventListener("click", () => {
//     if (settingsPopUp.classList.contains("noDisplay")) {
//         settingsPopUp.classList.remove("noDisplay")
//     } else {
//         settingsPopUp.classList.add("noDisplay")
//     }
// })


// Generates Subboards
function newSubboard(container) {
    let newSubboard = document.createElement('div');
    newSubboard.classList.add("board");

    for (let j = 0; j < 9; j++) {
        let newTile = document.createElement('div');

        newTile.classList.add("tile", "tileEmpty");

        newTile.addEventListener("click", () => {
            container.makeMove(j);
        })

        newSubboard.appendChild(newTile);
    }

    return newSubboard;
}

//Sets style of tile based on player who occupies tile
function styleTile(tile, player) {
    tile.classList.remove("tileEmpty");
    tile.classList.add(player == 1 ? "tileAmogus" : "tileCow");
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

        this.display = newSubboard(this)

        this.tiles = this.display.childNodes

        this.board = new Board()
    }

    // Makes move at specific index and returns result
    makeMove(index, player) {
        let result = this.board.makeMove(index,player)

        styleTile(this.tiles[index], player)

        if (result !=0) {
            styleSubboard(this.display, result)
        }

       
        return result
        
    }  
}




//The Large Strategic Board Itself
class StrategicBoard {
    // Container what will contain the subboards
    constructor(container) {
        // Creates array of 9 emtpy spaces, the following operation is run on every empty space
        this.subboards = new Array(9).fill(null).map(_ => {
            // Make New Subboard
            let newBoard = new TicTacToe();

            // Append its Visual Reference
            container.appendChild(newBoard.display)

            //Return the board to the subBoards Array
            return newBoard
        })

        this.board = new Board()
        
        this.player = 1
        this.subboard = null
    }
    makeMove(subboard, index) {
        if (this.subboard != null && subboard != this.subboard) {
            throw new Error("Bro u dumb u tried to play on da wrong subboard")
        }
    
        // Make move and store move result
        let result = this.subboards[subboard].makeMove(index, this.player)
        this.player = -this.player
    
    
        // Set the subboard to be index ONLY IF subboard is empty. otherwise set to null and ded and ahhhhhhh
        this.subboard = this.board["board"][index] == 0 ? index : null;

        //If a player won that board because of this, run this part
        if (result != 0) {
            // track move on larger board
            let winner = this.board.makeMove(subboard, -this.player)


            //if player won game do dis
            if (winner) {
                //log it
                console.log(`Player ${winner} won the game`)
                return winner
            }
        }

        return 0
    }
}
// Reference container
let boardWrapper = document.getElementById("board-wrapper")

// Make new strategic board contained by container
let board = new StrategicBoard(boardWrapper)



// this.tiles = document.querySelectorAll(".tile") 
// for (let tile of tiles) {
//     tile.addEventListener("click", () => {
//         board.makeMove(index, player)
//     })
// }