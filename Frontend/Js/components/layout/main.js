import { watchlistModal } from "../common/watchlistModal.js";
import { navbar } from "./navbar.js";

export function main(page) {
    const main = document.createElement('main')

    main.append(
        navbar(),
        watchlistModal(),
        page
    )
    return main;
}