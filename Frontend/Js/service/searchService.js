import { searchStocksApi } from "../api/searchApi.js";

export async function searchStocks(query) {

    const Stocks = await searchStocksApi(query)
    return Stocks

}