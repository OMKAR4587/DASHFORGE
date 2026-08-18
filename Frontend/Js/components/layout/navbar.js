import { navigate } from "../../router/router.js";
import { searchStocks } from "../../service/searchService.js";
import { marketState } from "../../state/marketState.js";
import { debounce } from "../../utils/debounce.js";
import { profileDropdown } from "../common/profileDropdown.js";
import { searchDropdown } from "../common/searchDropedown.js";

export function navbar() {

    const nav = document.createElement("header");

    nav.className = "navbar";

    nav.innerHTML = `

        <!-- LEFT BRAND -->
        <div class="navbar-brand">

            <div class="brand-logo">
                <img
                    src="./Assets/imgs/Logo.jpg"
                    alt="DashForge Logo"
                >
            </div>

            <div class="brand-info">

                <div class="brand-name">
                    DashForge
                </div>

                <div class="brand-status">
                    <span class="status-dot"></span>
                    <span>Market Terminal</span>
                </div>

            </div>

        </div>


        <!-- CENTER SEARCH -->
        <div class="navbar-search-area">

            <div class="search-box">

                <div class="search-icon">
                    <i data-lucide="search"></i>
                </div>

                <input
                    type="text"
                    placeholder="Search stocks, ETFs, companies..."
                    autocomplete="off"
                >

                <div class="search-shortcut">
                    <span>⌘</span>
                    <span>K</span>
                </div>

            </div>

        </div>


        <!-- RIGHT ACTIONS -->
        <div class="navbar-actions">

            <button
                class="nav-action-btn theme-btn"
                aria-label="Toggle theme"
            >
                <i data-lucide="moon"></i>
            </button>


            <button
                class="nav-action-btn notification-btn"
                aria-label="Notifications"
            >

                <i data-lucide="bell"></i>

                <span class="notification-dot"></span>

            </button>


            <div class="navbar-profile">
            </div>

        </div>

    `;


    /* =========================
       DOM
    ========================= */

    const input =
        nav.querySelector(".search-box input");

    const brand =
        nav.querySelector(".navbar-brand");

    const profileContainer =
        nav.querySelector(".navbar-profile");


    /* =========================
       BRAND CLICK
    ========================= */

    brand.addEventListener("click", () => {

        navigate("/dashboard");

    });


    /* =========================
       SEARCH
    ========================= */

    const searchHandler = debounce(async (e) => {

        const value =
            e.target.value.trim();

        const oldDropdown =
            nav.querySelector(".search-dropdown");

        if (oldDropdown) {
            oldDropdown.remove();
        }

        if (!value) return;

        try {

            const stocks =
                await searchStocks(value);

            const dropdown =
                searchDropdown(
                    stocks,
                    (stock) => {

                        marketState.selectedStock =
                            stock;

                        input.value = "";

                        nav
                            .querySelector(
                                ".search-dropdown"
                            )
                            ?.remove();

                        navigate(
                            `/stock/${stock.symbol}`
                        );

                    }
                );

            nav
                .querySelector(".search-box")
                .append(dropdown);

        } catch (error) {

            console.error(
                "Search error:",
                error
            );

        }

    }, 300);


    input.addEventListener(
        "input",
        searchHandler
    );


    /* =========================
       CLEAR DROPDOWN
    ========================= */

    input.addEventListener(
        "focus",
        () => {

            if (input.value.trim()) {

                input.dispatchEvent(
                    new Event("input")
                );

            }

        }
    );


    /* =========================
       PROFILE
    ========================= */

    profileContainer.append(
        profileDropdown()
    );


    return nav;
}