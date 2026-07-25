const BASEURL="http://localhost:5000/api"

export async function getHistory(symbol,range){
            console.count("HISTORY API");
    const response = await fetch(`${BASEURL}/market/history?symbol=${symbol}&range=${range}`)

    if(!response.ok){
       throw new Error('fail to fetch quotes');
    }
    
    return await response.json()
}

export async function getQuotes(symbols) {
    const response = await fetch(`${BASEURL}/market/quotes?symbols=${symbols.join(",")}`)
    const data = await response.json()
    console.log("marketApi",data)
    console.count("QUOTES API");
    return data.data;
}
