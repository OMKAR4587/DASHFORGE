 export function getChartOption(){
    return{
        chart: {
            type: "area",
            height: 376,
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
    }
 }