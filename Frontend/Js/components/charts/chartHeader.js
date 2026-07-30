export function chartHeader({ title, subtitle, ranges, showToolbar }) {

    const header = document.createElement("div");
    header.className = "stock-page-chart-header";

    const chartDiv = document.createElement("div");
    chartDiv.className = "chart-title";

    const timeFilterDiv = document.createElement("div");
    timeFilterDiv.className = "time-filter"

    const headingTag = document.createElement("h3");
    headingTag.textContent = title;

    const paraTag = document.createElement("p");
    paraTag.textContent = subtitle

    chartDiv.append(headingTag, paraTag);

    ranges.forEach((range, index) => {

        const button = document.createElement("button");

        button.className = "range-btn";

        if (index === 5) {
            button.classList.add("active")
        }

        button.dataset.range = range
        button.textContent = range;

        timeFilterDiv.appendChild(button);
    });

    // Future toolbar
    if (showToolbar) {
        const toolbar = document.createElement("div");
        toolbar.className = "chart-toolbar";

        // icons add
        header.append(chartDiv, timeFilterDiv, toolbar);

    } else {
        header.append(chartDiv, timeFilterDiv);
    }

    return header;
}