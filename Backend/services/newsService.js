import { YahooFinance } from "yahoo-finance2/createYahooFinance";

const yahoo = new YahooFinance();

export async function getNews(symbol) {

    const result = await yahoo.search(symbol);

    return result.news;
}