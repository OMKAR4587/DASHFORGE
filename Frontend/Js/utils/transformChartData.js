export function transformChartData(values) {

    return values
        .slice()
        .reverse()
        .map(item => ({
            x: item.datetime,
            y: Number(item.close)
        }));

}