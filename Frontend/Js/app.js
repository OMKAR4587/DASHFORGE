import { getNews, getQuote } from "./api/marketApi.js";
import { getStockData } from "./api/searchApi.js";
import { initStcokChart } from "./components/charts/stockChartController.js";
import { dashboard } from "./pages/dashboard.js";
import { initDashboard } from "./pages/dashboard.js";
import { stockDetails } from "./pages/stockDetail.js";
import { marketState } from "./state/marketState.js";
import { renderPage } from "./utils/renderPage.js";

const app = document.getElementById('app');

renderPage(dashboard());
await initDashboard();
window.addEventListener("routeChange", async () => {

    const quote = await getQuote(marketState.selectedStock.symbol);

    const latestNews = await getNews(marketState.selectedStock.symbol);
    
    const stockData = await getStockData(marketState.selectedStock.symbol);

    renderPage(stockDetails(quote,stockData,latestNews));

    await initStcokChart(marketState.selectedStock.symbol);

});