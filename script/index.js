let settings = document.getElementById("settingsIcon");
let settingsPopUp = document.getElementById("settingsPopUp");


settings.addEventListener("mouseover", () => {
    settingsPopUp.classList.remove("noDisplay")
})
settingsPopUp.addEventListener("focusout", () => {
    settingsPopUp.classList.add("noDisplay")
})




let boardWrapper = document.getElementById("boardWrapper")


//want to make the boards js but confused

// class BigBoard {
//     constructor() {

//     }
// }
// class SmallBoard {
//     constructor() {

//     }
//     this.boardDiv = document.createElement("div")

// }