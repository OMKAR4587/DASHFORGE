import { syncWatchlistUI } from "../../controller/watchlistController.js";
import { isInWatchlist, toggleWatchlist, updateWatchListButton } from "../../service/watchlistService.js";
export function companyHeader(quote) {
    console.log("header stockpage",quote)
    const section = document.createElement("section")
    section.className = "stock-page-top-section"

    const watchlistDiv = document.createElement("div");
    watchlistDiv.className = "right-watchlist-container";
    watchlistDiv.innerHTML = `
     <button id="watchlist-btn" class="watchlist-btn">

     </button>`

    const companyHeader = document.createElement("div");

    companyHeader.className = "company-header";

    companyHeader.innerHTML = `

     <div class="company-left">

            <img
                src="https://financialmodelingprep.com/image-stock/${quote.symbol}.png"
                class="company-logo"
            />

            <div>

                <h1>${quote.name}</h1>

                <p>${quote.exchange}</p>

            </div>

        </div>

        <div class="company-right">

            <h2>$${Number(quote.close).toFixed(2)}</h2>

           <span class="${quote.change >= 0 ? "price-up" : "price-down"}">

             ${quote.change > 0 ? "+" : ""}${quote.change.toFixed(2)}

            (${quote.percent_change > 0 ? "+" : ""}${quote.percent_change.toFixed(2)}%)

           </span>

        </div>
    `;
    section.append(companyHeader, watchlistDiv)

    const btn = watchlistDiv.querySelector("#watchlist-btn");

    updateWatchListButton(btn, quote.symbol);

    btn.addEventListener("click", () => {
        toggleWatchlist(quote);
        updateWatchListButton(btn, quote.symbol);
        syncWatchlistUI(quote.symbol);
    })

    return section

}