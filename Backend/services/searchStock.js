import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

export async function searchStocks(query) {
    if (!query || !query.trim()) return [];

    const result = await yahooFinance.search(query);

    return result.quotes
        .filter(stock => stock.quoteType === "EQUITY")
        .slice(0, 8)
        .map(stock => ({
            symbol: stock.symbol,
            name: stock.longname || stock.shortname,
            exchange: stock.exchange
        }));
}