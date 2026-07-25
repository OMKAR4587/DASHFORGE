import { getQuotes } from "../../api/marketApi.js";
import { categories } from "../../data/category.js";
import { marketState } from "../../state/marketState.js"
import { createStockItem } from "./stockItem.js";

export async function renderStockList() {

    const container = document.querySelector('.stock-list');

    container.innerHTML = "";

    const stocks = categories[marketState.currCategory]

    let quotes = marketState.quotesCache[marketState.currCategory];

    if (!quotes){

        quotes = await getQuotes(stocks);
        marketState.quotesCache[marketState.currCategory] = quotes;
    
    }if (quotes?.code ==='429') {
        quotes = await getQuotes(stocks);
        marketState.quotesCache[marketState.currCategory] = quotes;
    
    } else {
        // alert(quotes?.message)
    }

    Object.values(quotes).forEach((stock) => {
        container.appendChild(createStockItem(stock))
    })
}

export async function initCategoryTabs() {

    const categoryBtn = document.querySelectorAll('.stock-category-tab');

    categoryBtn.forEach((Btn) => {
        Btn.addEventListener("click", () => {

            marketState.currCategory = Btn.dataset.range;

            const stocks = categories[marketState.currCategory];

            marketState.currSymbol = stocks[0];

            categoryBtn.forEach((button) => button.classList.remove('active-category-stack'));
            Btn.classList.add('active-category-stack');

            renderStockList();

            document.dispatchEvent(
                new CustomEvent('stockChanged')
            )

        })
    })
}

// export async function renderStockList() {

//     const container = document.querySelector(".stock-list");
//     const categoryBtn = document.querySelectorAll('.stock-category-tab');

//     container.innerHTML = "";


//     categoryBtn.forEach((btn) => {
//         btn.addEventListener("click", () => {

//             marketState.currCategory = btn.dataset.range;

//             categoryBtn.forEach((button) => {
//                 button.classList.remove("active-category-stack")
//             })

//             btn.classList.add("active-category-stack");
//             renderStockList()

//         })

//     })

//     const stocks = categories[marketState.currCategory];

//     // if (!stocks.includes(marketState.currSymbol)) {
//     //     marketState.currSymbol = stocks[0]
//     //     renderStockList();
//     // }

//     const quotes = await getQuotes(stocks);

//     Object.values(quotes).forEach((stock) => {
//         container.appendChild(createStockItem(stock));
//     })

// }