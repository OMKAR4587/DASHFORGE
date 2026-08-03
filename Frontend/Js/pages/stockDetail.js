import { getHistory, getQuote } from "../api/marketApi.js";
import { updateChart } from "../components/charts/stockChart.js";
import { companyHeader } from "../components/stockDetails/companyHeader.js";
import { financialMetrics } from "../components/stockDetails/financialMetrics.js";
import { newsSection } from "../components/stockDetails/newsSection.js";
import { overview } from "../components/stockDetails/overviewCard.js";
import { quickStats } from "../components/stockDetails/quickStats.js";
import { stockChart } from "../components/stockDetails/stockChartCard.js";
import { marketState } from "../state/marketState.js";

export  function stockDetails(quote,stockData,latestNews) {

    const currStock = marketState.selectedStock;

    const page = document.createElement("div");

    page.className = "stock-details-page";

    const topSection = document.createElement("section");
    topSection.className = "stock-top-section";

    topSection.append(
        stockChart(),
        quickStats(quote,stockData.summaryDetail.marketCap)
    );

    page.append(
        companyHeader(currStock,quote),
        topSection,
        overview(stockData.assetProfile),
        financialMetrics(stockData),
        newsSection(latestNews)
    );

    return page;

}