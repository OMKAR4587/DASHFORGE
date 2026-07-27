import { getHistory } from "../../api/marketApi.js";
import { createChart, updateChart } from "./stockChart.js";

export async function initStcokChart(symbol){
    const chart = createChart("#stock-chart");

    const history = await getHistory(symbol, "1Y");

    const chartData = history.values
    .reverse()
    .map((item)=>({
        x:item.datetime,
        y:Number(item.close)
    }));

    updateChart(chart,symbol,chartData);
    
    return chart;
}