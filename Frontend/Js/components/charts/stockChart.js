import { getChartOption } from "./chartOptions.js";

export function createChart(selector) {

    const chart = new ApexCharts(
        document.querySelector(selector),
        getChartOption()
    );

    chart.render();

    return chart;
}

export function updateChart(chart, symbol, chartData) {

    const firstDate = chartData[0].x;
    const lastDate = chartData[chartData.length - 1].x;

    chart.updateOptions({

        series: [

            {

                name: symbol,

                data: chartData

            }

        ],

        xaxis: {

            min: firstDate,

            max: lastDate

        }

    }, true, true);

}

export function destroyChart(chart){

    if(chart){

        chart.destroy();

    }

}