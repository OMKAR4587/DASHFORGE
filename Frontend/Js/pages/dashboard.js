import { initMarketHeatmap, marketHeatmap } from "../components/dashboard/marketHeatmap.js";
import { marketTable } from "../components/dashboard/marketTable.js";
import { marketChart } from "../components/dashboard/marketChart.js";
import { Stories } from "../components/dashboard/Stories.js";
import { initChart } from "../api/dashboardChart.js";
import { renderStockList, initCategoryTabs } from "../components/small-features/stockList.js";
export function dashboard() {

    const page = document.createElement("section");

    page.className = "dashboard-page";

    page.append(
        marketChart(),
        marketHeatmap(),
        marketTable(),
        Stories()
    );
    return (page)
}
export async function initDashboard() {

    await initChart();

    await renderStockList();

    initCategoryTabs();

   await initMarketHeatmap();

}