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

