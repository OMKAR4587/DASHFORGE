const BASE_URL = "https://api.twelvedata.com";

export async function getStockHistory(symbol,range) {
    let interval = "1day";
    let outputsize = 365;

    switch(range){
        case "1D":
            interval="5min";
            outputsize=78;
            break;
        case "1M":
            interval="1day";
            outputsize=30;
            break;
        case "3M":
            interval="1day";
            outputsize=90;
            break;
        case "1Y":
            interval="1day";
            outputsize= 365;
            break;
        case "5Y":
            interval="1week";
            outputsize=260;
            break;
        case "ALL":
            interval="1month";
            outputsize=240;
            break;
    }
    const response = await fetch(`${BASE_URL}/time_series?symbol=${symbol}&interval=${interval}&outputsize=${outputsize}&apikey=${process.env.TWELVE_DATA_API_KEY}`)

    const data = await response.json();
    // console.log(data)

   if (data.status !== "ok") {
    throw new Error(data.message || "Failed to fetch market data");
}

    return data;
}