import { navbar } from "./navbar.js";

export function main(page) {
    const main = document.createElement('main')

    main.append(
        navbar(),
        page
    )
    return main;
}