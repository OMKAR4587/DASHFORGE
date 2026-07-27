import { errorPanel } from "../components/common/errorPanel.js";

const BASEURL = "http://localhost:5000/api"

export async function getHistory(symbol, range) {
    const response = await fetch(`${BASEURL}/market/history?symbol=${symbol}&range=${range}`)

    if (!response.ok) {
        throw new Error('fail to fetch quotes');
        errorPanel(Error)
    }

    return await response.json()
}

export async function getQuotes(symbols) {
    const response = await fetch(`${BASEURL}/market/quotes?symbols=${symbols.join(",")}`)
    if(!response.ok){
       throw new Error('fail to fetch quotes');
       errorPanel(Error)
    }
    const data = await response.json()

    return data.data;
}
