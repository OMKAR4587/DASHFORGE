import { dashboard } from "../../pages/dashboard.js";
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

        <div class="navbar-left">

            <img
                src="./Assets/imgs/Logo.jpg"
                class="logo"
                alt="Market Monitor Logo"
            >

            <div class="page-info">

                <h1 class="page-title">
                    Market Monitor
                </h1>

                <p class="page-subtitle">
                    Live Stock Dashboard
                </p>

            </div>

        </div>

        <div class="navbar-center">

            <div class="search-box">

                <i data-lucide="search"></i>

                <input
                    type="text"
                    placeholder="Search stocks, ETFs..."
                >

            </div>

        </div>

        <div class="navbar-right"> 
            <button class="icon-btn moon">
               
                <i data-lucide="moon"></i>

            </button>

            <button class="icon-btn">

                <i data-lucide="bell"></i>

            </button>

        </div>

    `;

    const input = nav.querySelector(".search-box input");

    const logoClick = nav.querySelector(".navbar-left");

    logoClick.addEventListener("click", ()=>{
        navigate("/dashboard")
    })

    const searchHandler = debounce(async (e) => {
        console.log("Input:", e.target.value);
        const value = e.target.value.trim();
        const old = nav.querySelector(".search-dropdown");

        if (old) {
            old.remove()
        }

        if (!value) return;

        const stocks = await searchStocks(value);

        const dropdown = searchDropdown(stocks, (stock) => {

            marketState.selectedStock = stock
            input.value = "";

            document.querySelector(".search-dropdown")?.remove();
            navigate(`/stock/${stock.symbol}`);

        });

        nav.querySelector(".search-box")
            .append(dropdown);

    }, 300)

    input.addEventListener("input", searchHandler);

    const right = nav.querySelector(".navbar-right");
    right.append(profileDropdown());
    
    return nav;

}