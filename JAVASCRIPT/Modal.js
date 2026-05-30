import { renderTreemap } from "./Data.js"
const modal = document.getElementById("popup")
const openBtn = document.getElementById("openBtn")
const closeBtn = document.getElementById("closeBtn")

openBtn.addEventListener("click", () => {
    modal.classList.add("active")
    renderTreemap()
})

closeBtn.addEventListener("click", () => {
    modal.classList.remove("active")
      renderTreemap()
})