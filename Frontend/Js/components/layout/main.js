import { navbar } from "./navbar.js";
import { dashboard } from "../../pages/dashboard.js";
export function main() {
    const main = document.createElement('main')
    main.append(
        navbar(),
        dashboard()
    )
    return main;
}