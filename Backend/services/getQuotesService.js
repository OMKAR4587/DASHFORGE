import YahooFinance  from "yahoo-finance2";
const yahooFinance = new YahooFinance();

export async function getStockQuotes(symbols) {

    const quotes = {};

    const results = await Promise.all(
        symbols.map(symbol => yahooFinance.quote(symbol))
    );

    results.forEach(stock => {
        quotes[stock.symbol] = {
            symbol: stock.symbol,
            name: stock.longName || stock.shortName,
            exchange: stock.fullExchangeName,
            currency: stock.currency,

            open: stock.regularMarketOpen,
            high: stock.regularMarketDayHigh,
            low: stock.regularMarketDayLow,

            close: stock.regularMarketPrice,
            previous_close: stock.regularMarketPreviousClose,

            change: stock.regularMarketChange,

            percent_change: stock.regularMarketChangePercent,

            volume: stock.regularMarketVolume,

            is_market_open: stock.marketState === "REGULAR"
        };
    });

    return quotes;
}