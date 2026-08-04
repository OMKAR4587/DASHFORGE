import { openWatchlist } from "../../controller/watchlistController.js";

export function profileDropdown() {

    const container = document.createElement("div");

    container.className = "profile-dropdown";

    container.innerHTML = `

    <button class="profile-btn">

        <img
        src="https://i.pravatar.cc/40"
        alt="Profile">

    <div>

        <strong>Rahul</strong>

        <small>Investor</small>

    </div>
        <i data-lucide="chevron-down"></i>
    </button>

    <div class="dropdown-menu">

        <button class="dropdown-item watchlist-option">

        <i data-lucide="star"></i>
            Watchlist
        </button>

        <button class="dropdown-item logout-option">
            <i data-lucide="log-out"></i>
            Logout
        </button>

    </div>
    `;

    const profileBtn = container.querySelector(".profile-btn");
    const dropdown = container.querySelector(".dropdown-menu");
    const watchlistBtn = container.querySelector(".watchlist-option");

    profileBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        dropdown.classList.toggle("show");

        profileBtn.classList.toggle("active");

    });
    document.addEventListener("click", () => {

        dropdown.classList.remove("show");
        profileBtn.classList.remove("active");

    });

    watchlistBtn.addEventListener("click",()=>{
        openWatchlist()
    })
    return container
}