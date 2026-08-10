import { main } from "../components/layout/main.js";

const app = document.querySelector("#app");

export function renderPage(page, useMain = true) {
    app.innerHTML = ""

    if (useMain) {

        app.append(main(page) )
        
    }else{

        app.append(page)

    }

    lucide.createIcons();
}