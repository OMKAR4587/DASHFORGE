import { openWatchlist } from "../../controller/watchlistController.js";
import { navigate } from "../../router/router.js";
import { authState, clearAuth } from "../../state/authState.js";

export function profileDropdown() {

    const container = document.createElement("div");

    const user = authState.user;
    container.className = "profile-dropdown";

    container.innerHTML = `

    <button class="profile-btn">

       <div class="profile-avatar">
                ${user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

    <div>

        <strong>${user.name}</strong>

        <small>${user.email}</small>

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
    const logOff = container.querySelector(".logout-option");

    logOff.addEventListener("click", () => {
        clearAuth();
        navigate("/");
    })

    profileBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        dropdown.classList.toggle("show");

        profileBtn.classList.toggle("active");

    });
    document.addEventListener("click", () => {

        dropdown.classList.remove("show");
        profileBtn.classList.remove("active");

    });

    watchlistBtn.addEventListener("click", () => {
        openWatchlist()
    })
    return container
}