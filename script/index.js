let settings = document.getElementById("settingsIcon");
let settingsPopUp = document.getElementById("settingsPopUp");


settings.addEventListener("click", () => {
    if (settingsPopUp.classList.contains("noDisplay")) {
        settingsPopUp.classList.remove("noDisplay")
    } else {
        settingsPopUp.classList.add("noDisplay")
    }
})





let boardWrapper = document.getElementById("boardWrapper")


//want to make the boards js but confused

class BigBoard {
    addBoards() {
        for (i = 0; i < 9; i++) {
            new SmallBoard
            SmallBoard.addRows
            SmallBoard.appendChild(SmallRow)
        }
    }

}
class SmallBoard {
    addRows() {
        for (i = 0; i < 9; i++) {
            new SmallRow
            SmallRow.addItems
            SmallRow.appendChild(SmallItem)
        }
    }

}
class SmallRow {
    addItems() {
        for (i = 0; i < 9; i++) {
            new SmallItem
            SmallItem.createItems
        }
    }
}
class SmallItem {
    createItem() {
        document.createElement("div")
    }
}
