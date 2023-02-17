let settings = document.getElementById("settingsIcon");
let settingsPopUp = document.getElementById("settingsPopUp");
let youtube = document.getElementById("youtube")


settings.addEventListener("mouseover", () => {
    settingsPopUp.classList.remove("noDisplay")
})
settingsPopUp.addEventListener("focusout", () => {
    settingsPopUp.classList.add("noDisplay")
})