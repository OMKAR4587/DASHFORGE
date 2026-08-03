import YahooFinance from 'yahoo-finance2'

const yahoo = new YahooFinance();

export async function getProfile(symbol) {
    const data = await yahoo.quoteSummary(symbol, {
        modules: [
            "assetProfile",
            "summaryDetail",
            "financialData",
            "defaultKeyStatistics",
            "recommendationTrend"
        ]
    })

    return data

}
