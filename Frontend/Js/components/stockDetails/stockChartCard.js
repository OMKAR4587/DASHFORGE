import { getHistory } from "../../api/marketApi.js";
import { initRangeEvent } from "../../utils/chartRangeEvent.js";
import { chartHeader } from "../charts/chartHeader.js";
import { createLoader } from "../common/loader.js";


export function stockChart(stock) {


    const section = document.createElement("section");

    section.className = "card stock-chart-card";

    section.append(

        chartHeader({
            title: "Price Performance",
            subtitle: "Historical Market Data",
            ranges: ["1D", "1M", "3M", "1Y", "5Y", "ALL"],
            showToolbar: true
        })

    );

    const chart = document.createElement("div");

    chart.id = "stock-chart";

    section.append(chart);

    const loader = createLoader("chart-loader")

    section.appendChild(loader)

    return section;
}