export const marketState = {
    currCategory: "Financial",
    currSymbol: "JPM",
    currRange: '1Y',
    quotesCache: {},
    historyCache: {},
    selectedStock: null,
    watchlist: JSON.parse(
        localStorage.getItem("watchlist")
    ) || []
}