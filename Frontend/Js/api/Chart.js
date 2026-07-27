import { createStockChart, updateChart } from "../components/charts/stockChart.js";
import { hideLoader, showLoader } from "../components/common/loader.js";
import { marketState } from "../state/marketState.js";
import { getHistory } from "./marketApi.js";

export async function initChart() {

    const chart = await createStockChart("#chart")

    await loadChartData("1Y");

    document.addEventListener("stockChanged", () => {
        loadChartData(marketState.currRange)
    })

    // setup data from api on the chart map
    async function loadChartData(range = '1Y') {
        showLoader('chart-loader');

        try {
            const cacheKey = `${marketState.currSymbol}_${range}`;
            let  history = marketState.historyCache[cacheKey];
            if(!history){
                history = await getHistory(marketState.currSymbol,range)
            }
            marketState.historyCache[cacheKey] = history;

            const chartData = transformChartData(history);
            console.log(chartData)

            const firstDate = chartData[0].x;
            const lastDate = chartData[chartData.length - 1].x;

           updateChart(
            chart,
            marketState.currSymbol,
            chartData
           )

        } finally{

            hideLoader('chart-loader')

        } 
    }

    

    function transformChartData(history) {
        console.log(history)
        return history.values
            .reverse()
            .map(item => ({
                x: item.datetime,
                y: Number(item.close)
            }));
    }

    const timeBtn = document.querySelectorAll('.range-btn');
    timeBtn.forEach((button) => {
        button.addEventListener("click", () => {
            timeBtn.forEach(btn => btn.classList.remove('active'))
            button.classList.add('active')
            marketState.currRange = button.dataset.range
            loadChartData(marketState.currRange)
        })
    })
}