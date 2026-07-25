import { main } from "../components/layout/main.js";

const app = document.querySelector("#app");
export function renderPage(page) {
    app.innerHTML = ""

    app.append(
        main(page)
    )
    
    lucide.createIcons();
}