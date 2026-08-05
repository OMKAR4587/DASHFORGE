import { updateWatchlistCount, watchlistModal } from "../components/common/watchlistModal.js";
import { stockDetails } from "../pages/stockDetail.js";
import { navigate } from "../router/router.js";
import { toggleWatchlist, updateWatchListButton } from "../service/watchlistService.js";
import { marketState } from "../state/marketState.js";


let modal = null;

export function syncWatchlistUI(symbol = null) {
    updateWatchlistCount()
    const btn = document.querySelector("#watchlist-btn");

    if (
        btn &&
        symbol &&
        marketState.selectedStock &&
        marketState.selectedStock.symbol === symbol
    ) {
        updateWatchListButton(btn, symbol);
    }

}

export function renderWatchlist() {
    if (!modal) return;

    const title = document.querySelector(".watchlist-title");

    if (title) {
        title.textContent = `⭐ My Watchlist (${marketState.watchlist.length})`;
    }

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
    <div class="watchlist-left">

        <img
            src="https://financialmodelingprep.com/image-stock/${stock.symbol}.png"
            class="watchlist-logo"
        >

        <div class="watchlist-info">

            <h4>${stock.symbol}</h4>

            <p>${stock.name}</p>

        </div>

    </div>

    <div class="watchlist-actions">

        <button class="view-stock" title="View Stock">

            <i data-lucide="arrow-up-right"></i>

        </button>

        <button class="remove-stock" title="Remove">

            <i data-lucide="trash-2"></i>

        </button>

    </div>
`;

        const viewBtn = card.querySelector(".view-stock");
        viewBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            marketState.selectedStock = stock;
            closeWatchlist();
            navigate(`/stock/${stock.symbol}`);
        })

        const removeBtn = card.querySelector(".remove-stock");

        removeBtn.addEventListener("click", (e) => {

            e.stopPropagation();

            toggleWatchlist(stock);

            syncWatchlistUI(stock.symbol);

            renderWatchlist();

        });

        container.append(card)

        card.addEventListener("click", () => {

            marketState.selectedStock = stock;

            closeWatchlist();

            navigate(`/stock/${stock.symbol}`);

        });

    });
    lucide.createIcons();
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