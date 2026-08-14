import { watchlistModal } from "../common/watchlistModal.js";
import { Footer } from "./footer.js";
import { navbar } from "./navbar.js";

export function main(page) {
    const main = document.createElement('main')

    main.append(
        navbar(),
        watchlistModal(),
        page,
        Footer()
    )
    return main;
}