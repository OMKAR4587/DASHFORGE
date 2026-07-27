

export function errorPanel(err) {
        const dashboardSection = document.querySelector(".market-data");
        dashboardSection.innerHTML = "";

        const errorPanel = createElement("div");
        errorPanel.className = "errorPanel";

        const errorHeading = createElement("h1");
        errorHeading.className = "errorHeading";

        errorHeading.innerText =
            err || "The page is currently unavailable. Please try again later."; errorPanel.appendChild(errorHeading);
        dashboardSection.appendChild(errorPanel);
}