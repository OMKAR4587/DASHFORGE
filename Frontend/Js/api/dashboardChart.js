import { createChart, updateChart } from "../components/charts/stockChart.js";
import { hideLoader, showLoader } from "../components/common/loader.js";
import { marketState } from "../state/marketState.js";
import { initRangeEvent } from "../utils/chartRangeEvent.js";
import { transformChartData } from "../utils/transformChartData.js";
import { getHistory } from "./marketApi.js";

export async function initChart() {
    let chart ;
    if (chart) {

        destroyChart(chart);

    }

    chart = createChart("#chart");

    await loadChartData("1Y");

    document.addEventListener("stockChanged", () => {
        loadChartData(marketState.currRange)
    })

    // setup data from api on the chart map
    async function loadChartData(range = '1Y') {
        showLoader('chart-loader');

        try {
            const cacheKey = `${marketState.currSymbol}_${range}`;
            let history = marketState.historyCache[cacheKey];
            if (!history) {
                history = await getHistory(marketState.currSymbol, range)
            }
            marketState.historyCache[cacheKey] = history;

            const chartData = transformChartData(history.values);
            console.log(chartData)

            const firstDate = chartData[0].x;
            const lastDate = chartData[chartData.length - 1].x;

            updateChart(
                chart,
                marketState.currSymbol,
                chartData
            )

        } finally {

            hideLoader('chart-loader')

        }
    }




    // loading chart based on range  
    initRangeEvent((range)=>{
        marketState.currRange = range;
        loadChartData(marketState.currRange);
    })
}