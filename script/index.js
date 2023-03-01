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

// For generating subboards
function new_subboard(i) {
    let subboard = document.createElement('div');
    subboard.classList.add("board");

    for (let j = 0; j < 9; j++) {
        let tile = document.createElement('div');
        tile.classList.add("tile");
        tile.id = i * 9 + j;
        tile.addEventListener("click", () => {
            tile.classList.add("red")
        })
        subboard.appendChild(tile);
    }

    return subboard;
}

// Generates the entire board
for (let i = 0; i < 9; i++) {
    board_wrapper.appendChild(
        new_subboard(i)
    );
}






class TicTacToe {
    constructor() {
        this.board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    }
    
    //makes a move
    makeMove(player, x, y) {
        this.board[x][y] = player
    }

    //checks for win
    checkWin() {
        for(let i = 0; i < 3; i++) {
            if (board[0][i] == board[1][i] == board[2][i]){
                console.log(board[0][i])
            }
        }
        for(let i = 0; i < 3; i++) {
            if (board[i][0] == board[i][1] == board[i][2]){
                console.log(board[i][0])
            }
        }
        if (board[0][0] == board[1][1] == board[2][2]) {
            console.log(board[0][0])
        }
        if (board[0][2] == board[1][1] == board[2][0]) {
            console.log(board[0][2])
        }
    }
}

let board = new TicTacToe()
