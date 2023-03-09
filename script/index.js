// let settings = document.getElementById("settingsIcon");
// let settingsPopUp = document.getElementById("settingsPopUp");
// settings.addEventListener("click", () => {
//     if (settingsPopUp.classList.contains("noDisplay")) {
//         settingsPopUp.classList.remove("noDisplay")
//     } else {
//         settingsPopUp.classList.add("noDisplay")
//     }
// })

let restartButton = document.getElementById("restart");
restartButton.addEventListener("click", () => {
    let subBoardsArr = document.querySelectorAll(".subboard")
    for (let subboard of subBoardsArr) {
        resetSubboard(subboard);
    
    }
    for (let tile of tilesArr) {
        resetTiles(tile)
    }
    
    board.player = 1
    board.subboard = null
    board.reset()
})



// Generates Subboards
function newSubboard(i) {
    let newSubboard = document.createElement('div');
    newSubboard.classList.add("board", "subboard");
    newSubboard.id = "0" + i
    for (let j = 0; j < 9; j++) {


        let newTile = document.createElement('div');

        newTile.classList.add("tile", "tileEmpty");
        newTile.id = i * 9 + j;
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
    subboard.classList.remove("boardEmpty");

    switch (player) {
        case 1:
            subboard.classList.add("boardAmogus");
            break
        case -1:
            subboard.classList.add("boardCow");
            break
        case 2:
            subboard.classList.add("boardDed");
            break
    }
}

// Resets subboard classes
function resetSubboard(subboard) {
    subboard.classList.add("boardEmpty")
    subboard.classList.remove("boardCow", "boardAmogus", "boardDed")
}
// Resets tiles classes
function resetTiles(tile) {
    tile.classList.add("tileEmpty")
    tile.classList.remove("tileAmogus", "tileCow")
}

// Represents the functionality but not the style of the tic tac toe board
class Board {
    constructor() {
        this.board = [
         0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
        this.isComplete = false;
    }
    
    resetIndex() {
        this.board = [
            0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
    }


    // Makes a move if possible, throw error if cant make move
    makeMove(index, player) {
        //checks for illegal moves
        if (this.board[index] != 0) {
            // alert(""You tried to play on an already occupied tile!"")
            throw new Error("You tried to play on an already occupied tile!")
        }
        if (this.isComplete) {
            alert("You tried to play on an already completed board!")
            throw new Error("You tried to play on an already completed board!")
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
        console.log(board[0], board[1], board[2], board[3], board[4], board[5], board[6], board[7], board[8], )

        // Forward Diagonal Win
        if (board[0] != 0 && board[0] == board[4] && board[0] == board[8]) {
            console.log(`FW Diagonal Wins Check: ${board[0]}, ${board[4]}, ${board[8]} `)
            return board[0]
        }

        if (board[2] != 0 && board[2] == board[4] && board[2] == board[6]) {
            console.log(`BW Diagonal Wins Check: ${board[2]}, ${board[4]}, ${board[6]} `)
            return board[2]
        } 
        
        for(let i = 0; i < 3; i++) {
            let col = i * 3

            // Check Horizontal Wins
            if (board[col] != 0 && board[col] == board[col + 1] && board[col] == board[col + 2]) {
                console.log(`Horizontal: ${board[col]}, ${board[col + 1]}, ${board[col + 2]} `)
                return board[col]
            }

            //Check Verticle Wins
            if (board[i] != 0 && board[i] == board[i + 3] && board[i] == board[i + 6]) {
                console.log(`Verticle Wins Check: ${board[i]}, ${board[i + 3]}, ${board[i + 6]} `)
                return board[i]
            } 
        }
        
        // Backwards Diagonal Win
        

        
        
        // Draw Case
        if (!this.board.includes(0)) {
            return 2
        }

        return 0
    }
}

class TicTacToe {
    constructor(i) {
        this.display = newSubboard(i)

        this.tiles = this.display.childNodes

        this.board = new Board()
    }

    // Makes move at specific index and returns result
    makeMove(index, player) {
        let result = this.board.makeMove(index,player)
        // console.log(result);

        styleTile(this.tiles[index], player)

        if (result !=0) {
            styleSubboard(this.display, result)
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
            container.appendChild(newBoard.display)

            //Return the board to the subBoards Array

            return newBoard
        })




        this.board = new Board()
        
        this.player = 1
        this.subboard = null
    }
    makeMove(subboard, index) {
        
        //code is to add the inPlay highlights but no work yet {
        let subboardID = document.getElementById("0" + subboard)
        subboardID.classList.add("inPlay")
        subboardID.classList.remove("inPlay")
        // } code is to add the inPlay highlights but no work yet 



        if (this.subboard != null) {
            if (subboard != this.subboard) {
                alert("You tried to play on the wrong board!")
                throw new Error("You tried to play on the wrong board!")
            }
        }
    
        // Make move and store move result
        let result = this.subboards[subboard].makeMove(index, this.player)


        this.player = -this.player


        //If a player won that board because of this, run this part
        if (result != 0) {
            console.log(result)
            // track move on larger board
            let winner = this.board.makeMove(subboard, -this.player)
            
            
            //if player won game do dis
            if (winner) {
                //alert it
                
                alert(`Player ${winner} won the game`)
                return winner
            }
        }
        
        // Set the subboard to be index ONLY IF subboard is empty. otherwise set to null and ded and ahhhhhhh
        // console.log(this.board["board"]);
        this.subboard = this.board["board"][index] == 0 ? index : null;

        return 0
    }

    reset() {
        this.subboards.forEach((subboard) => {
            subboard.board.resetIndex();
            subboard.board.isComplete = false
        })
        
    }
}
// Reference container
let boardWrapper = document.getElementById("board-wrapper")

// Make new strategic board contained by container
let board = new StrategicBoard(boardWrapper)


// let subBoardsArr = document.querySelectorAll(".subboard")
let tilesArr = document.querySelectorAll(".tile") 
for (let tile of tilesArr) {
    tile.addEventListener("click", () => {
        let subboard = Math.floor(tile.id / 9)
        let index = tile.id % 9
        board.makeMove(subboard, index)
    })
}
