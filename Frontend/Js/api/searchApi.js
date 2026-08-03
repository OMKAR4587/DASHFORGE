const BASE_URL = "http://localhost:5000/api";

export async function searchStocksApi(query) {

    const res = await fetch(`${BASE_URL}/market/search?q=${query}`);

    const data = await res.json();

    return data;
}

export async function getStockData(symbol){

    const res = await fetch(`${BASE_URL}/market/profile?symbol=${symbol}`)

    const data = await res.json();

    return data;
}