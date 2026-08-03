import { getHistory } from "../../api/marketApi.js";
import { marketState } from "../../state/marketState.js";
import { initRangeEvent } from "../../utils/chartRangeEvent.js";
import { transformChartData } from "../../utils/transformChartData.js";
import { hideLoader, showLoader } from "../common/loader.js";
import { createChart, updateChart } from "./stockChart.js";

export async function initStcokChart(symbol) {

    const chart = createChart("#stock-chart");

    const history = await getHistory(symbol, "1Y");

    const chartData = history.values
        .reverse()
        .map((item) => ({
            x: item.datetime,
            y: Number(item.close)
        }));

    updateChart(chart, symbol, chartData);

    initRangeEvent(async (range) => {

        showLoader("chart-loader")

        try {
            const history = await getHistory(symbol, range);

            const chartData = transformChartData(history.values);

            updateChart(chart, symbol, chartData);
        }
        finally {
            hideLoader("chart-loader")
        }

    });

    return chart;
}