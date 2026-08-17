const BASE_URL = "https://dashforge-3tqz.onrender.com";

export async function searchStocksApi(query) {

    const res = await fetch(`${BASE_URL}/api/market/search?q=${query}`);
    
    const data = await res.json();

    return data;
}

export async function getStockData(symbol){

    const res = await fetch(`${BASE_URL}/api/market/profile?symbol=${symbol}`)

    const data = await res.json();

    return data;
}