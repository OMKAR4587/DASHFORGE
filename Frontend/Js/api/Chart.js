import { hideLoader, showLoader } from "../components/common/loader.js";
import { marketState } from "../state/marketState.js";
import { getHistory } from "./marketApi.js";

export async function initChart() {
    const options = {
        chart: {
            type: "area",
            height: 430,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },
            animations: {
                enabled: true,
                easing: "easeinout",
                speed: 500
            }
        },

        series: [
            {
                name: "AAPL",
                data: []
            }
        ],

        colors: ["#22C55E"],

        stroke: {
            curve: "smooth",
            width: 3
        },

        fill: {
            type: "gradient",
            gradient: {
                shade: "light",
                type: "vertical",
                shadeIntensity: 0.3,
                inverseColors: false,
                opacityFrom: 0.35,
                opacityTo: 0.02,
                stops: [0, 100]
            }
        },

        dataLabels: {
            enabled: false
        },

        markers: {
            size: 0,
            hover: {
                size: 6
            }
        },

        grid: {
            borderColor: "#E5E7EB",
            strokeDashArray: 4,
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            }
        },

        xaxis: {
            type: "datetime",
            tickAmount: 6,
            labels: {
                datetimeUTC: false
            }
        },

        yaxis: {
            tickAmount: 5,
            forceNiceScale: true,
            decimalsInFloat: 2,
            labels: {
                formatter: (value) => `$${value.toFixed(2)}`
            }
        },

        tooltip: {
            theme: "light",

            x: {
                format: "dd MMM yyyy"
            },

            y: {
                formatter: (value) => `$${value.toFixed(2)}`
            }
        },

        legend: {
            show: false
        }
    };
    const chart = new ApexCharts(
        document.querySelector("#chart"),
        options
    );

    await chart.render();
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
            chart.updateOptions({
                series: [
                    {
                        name: marketState.currSymbol,
                        data: chartData
                    }
                ],
                xaxis: {
                    min: firstDate,
                    max: lastDate
                }
            }, true, true);

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