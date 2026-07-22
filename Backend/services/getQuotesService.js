const BASE_URL = "https://api.twelvedata.com";

export async function getStockQuotes(symbols){

    const response = await fetch(`${BASE_URL}/quote?symbol=${symbols.join(",")}&apikey=${process.env.TWELVE_DATA_API_KEY}`);
    const data = await response.json();

    return data;
}