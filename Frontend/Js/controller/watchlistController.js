import { marketState } from "../state/marketState.js";
// import brokenImg from "../../Assets/imgs/brokenImg.png"
let modal = null;

export function renderWatchlist() {
    if (!modal) return;

    const container = document.querySelector(".watchlist-content");

    container.innerHTML = "";

    if (marketState.watchlist.length === 0) {
        container.innerHTML = `
         <div class="empty-watchlist">

            <h3>No Stocks Added</h3>

            <p>Add your favourite stocks to the watchlist.</p>

        </div>
        `
        return;
    }

    marketState.watchlist.forEach(stock => {
        const card = document.createElement("div")
        card.className = "watchlist-card";
        card.innerHTML = `
         <img
        src="https://financialmodelingprep.com/image-stock/${stock.symbol}.png"
        class="watchlist-logo"
         onerror="this.src='../../Assets/imgs/brokenImg.png'"
         >

       <div class="watchlist-info">

          <strong>${stock.symbol}</strong>

          <small>${stock.name}</small>

       </div>

       <button class="remove-stock">

           ✕

       </button>
        `;
        container.append(card)

    });
}
export function registerWatchList(element) {
    modal = element;
}

export function openWatchlist() {
    if (!modal) return;

    renderWatchlist()
    modal.classList.remove("hidden")
}

export function closeWatchlist() {
    if (!modal) return;

    modal.classList.add("hidden")
}