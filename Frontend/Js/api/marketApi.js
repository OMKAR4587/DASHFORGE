import { errorPanel } from "../components/common/errorPanel.js";

const BASEURL = "https://dashforge-3tqz.onrender.com";

export async function getHistory(symbol, range) {
    const response = await fetch(`${BASEURL}/api/market/history?symbol=${symbol}&range=${range}`)

    if (!response.ok) {
        throw new Error('fail to fetch quotes');
        errorPanel(Error)
    }

    return await response.json()
}

export async function getQuotes(symbols) {
    const response = await fetch(`${BASEURL}/api/market/quotes?symbols=${symbols.join(",")}`)
    if(!response.ok){
       throw new Error('fail to fetch quotes');
       errorPanel(Error)
    }
    const data = await response.json()

    return data.data;
}

export async function getQuote(symbol){

    const quotes = await getQuotes([symbol]);

    return quotes[symbol];

}
export async function getNews(symbol){
    
    const response = await fetch(`${BASEURL}/api/market/news?symbol=${symbol}`);

    if(!response.ok){
        throw new Error("failed to fatche api");   
    }

    const newsData = await response.json();
    
    return newsData
}

export async function marketNews() {

    const response = await fetch(
        `${BASEURL}/api/market/market-news`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch market news"
        );
    }

    const data = await response.json();

    console.log(
        "MARKET NEWS DATA:",
        data
    );

    return data;
}