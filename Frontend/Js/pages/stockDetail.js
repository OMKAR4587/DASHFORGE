import { companyHeader } from "../components/stockDetails/companyHeader.js";
import { financialMetrics } from "../components/stockDetails/financialMetrics.js";
import { newsSection } from "../components/stockDetails/newsSection.js";
import { overview } from "../components/stockDetails/overviewCard.js";
import { quickStats } from "../components/stockDetails/quickStats.js";
import { stockChart } from "../components/stockDetails/stockChart.js";
import { stock } from "../state/marketState.js";
export function stockDetails() {

    const page = document.createElement("div");

    page.className = "stock-details-page";

    const topSection = document.createElement("section");
    topSection.className = "stock-top-section";

    topSection.append(
        stockChart(stock),
        quickStats(stock)
    );

    page.append(
        companyHeader(stock),
        topSection,
        overview(stock),
        financialMetrics(stock),
        newsSection(stock)
    );

    return page;

}