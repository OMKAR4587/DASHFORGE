import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

export async function getMarketNews() {

    try {

        const result = await yahooFinance.search("stock market");

        return result.news || [];

    } catch (error) {

        console.error(
            "Yahoo Finance news error:",
            error
        );

        throw error;
    }
}