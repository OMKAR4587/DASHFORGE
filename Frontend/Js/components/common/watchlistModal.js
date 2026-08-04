import { closeWatchlist, registerWatchList } from "../../controller/watchlistController.js";

export function watchlistModal() {

    const modal = document.createElement("div");

    modal.className = "watchlist-modal hidden";

    modal.innerHTML = `

        <div class="watchlist-overlay"></div>

        <div class="watchlist-panel">

            <div class="watchlist-header">

                <h2>
                    ⭐ My Watchlist
                </h2>

                <button class="close-watchlist">

                    ✕

                </button>

            </div>

            <div class="watchlist-content">

            </div>

        </div>

    `;

    registerWatchList(modal);

    const closeBtn = modal.querySelector(".close-watchlist");

    const overlay = modal.querySelector(".watchlist-overlay");

    closeBtn.addEventListener("click", closeWatchlist);

    overlay.addEventListener("click", closeWatchlist)
    return modal;

}