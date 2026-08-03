import { marketState } from "../state/marketState.js";

export function isInWatchlist(symbol) {
    return marketState.watchlist.some((stock) => stock.symbol === symbol);
}

export function toggleWatchlist(stock) {

    const exists = isInWatchlist(stock.symbol);

    if (exists) {
        marketState.watchlist = marketState.watchlist.filter((item) => {
            return item.symbol !== stock.symbol;
        })
    } else {
        marketState.watchlist.push(stock);
    }

    localStorage.setItem("watchlist", JSON.stringify(marketState.watchlist));

    console.log(marketState.watchlist);

}

export function updateWatchListButton(btn,symbol) {

    const isAdded = isInWatchlist(symbol);

    if (isAdded) {

        btn.innerHTML = `
        <i data-lucide="star"></i>
        Remove Watchlist
    `;

        btn.classList.remove("add-watchlist");
        btn.classList.add("remove-watchlist");

    }
    else {

        btn.innerHTML = `
        <i data-lucide="star"></i>
        Add Watchlist
    `;

        btn.classList.remove("remove-watchlist");
        btn.classList.add("add-watchlist");

    }

}   