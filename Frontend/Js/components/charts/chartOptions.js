export function getChartOption() {

    const isDark = document.documentElement.dataset.theme === "dark";

    return {

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

                speed: 800,

                animateGradually: {

                    enabled: true,

                    delay: 80

                },

                dynamicAnimation: {

                    enabled: true,

                    speed: 400

                }

            },

            dropShadow: {

                enabled: true,

                top: 4,

                left: 0,

                blur: 10,

                opacity: 0.12

            }

        },

        theme: {

            mode: isDark ? "dark" : "light"

        },

        series: [

            {

                name: "Price",

                data: []

            }

        ],

        colors: [

            getComputedStyle(document.documentElement)
                .getPropertyValue("--success")
                .trim() || "#22C55E"

        ],

        stroke: {

            curve: "smooth",

            width: 2.5,

            lineCap: "round"

        },

        fill: {

            type: "gradient",

            gradient: {

                shade: isDark ? "dark" : "light",

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

            strokeWidth: 3,

            hover: {

                size: 4

            }

        },

        grid: {

            borderColor: getComputedStyle(document.documentElement)
                .getPropertyValue("--border")
                .trim(),

            strokeDashArray: 6,

            padding: {

                left: 10,

                right: 10

            },

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

                datetimeUTC: false,

                style: {

                    colors: getComputedStyle(document.documentElement)
                        .getPropertyValue("--text-muted")
                        .trim()

                }

            },

            crosshairs: {

                show: true,

                stroke: {

                    color: "#94A3B8",

                    width: 1,

                    dashArray: 4

                }

            }

        },

        yaxis: {

            tickAmount: 5,

            forceNiceScale: true,

            decimalsInFloat: 2,

            labels: {

                style: {

                    colors: getComputedStyle(document.documentElement)
                        .getPropertyValue("--text-muted")
                        .trim()

                },

                formatter: (value) => `$${value.toFixed(2)}`

            }

        },

        tooltip: {

            theme: isDark ? "dark" : "light",

            shared: false,

            intersect: false,

            followCursor: true,

            x: {

                format: "dd MMM yyyy"

            },

            y: {

                formatter: (value) => `$${value.toFixed(2)}`

            }

        },

        legend: {

            show: false

        },

        states: {

            hover: {

                filter: {

                    type: "darken",

                    value: 0.9

                }

            },

            active: {

                filter: {

                    type: "none"

                }

            }

        }

    };

}