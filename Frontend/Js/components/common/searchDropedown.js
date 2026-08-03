export function searchDropdown(stocks = [], onSelect) {
    const dropdown = document.createElement("div");
    dropdown.className = "search-dropdown";

    if (!stocks.length) {
        dropdown.innerHTML = `
        <div class="search-empty">
           No stocks found
        </div>
        `;
        return dropdown;
    }

    stocks.forEach((stock) => {  
        const item = document.createElement("div");

        item.className = "search-item";

        item.dataset.symbol = stock.symbol;

        item.innerHTML = `

        <div class="search-left">
        
        <img 
        src="https://financialmodelingprep.com/image-stock/${stock.symbol}.png"
        class="search-logo"/>

        <div>

           <h4>${stock.name}</h4>
           <p>${stock.symbol}</p>

        </div>

        </div>`
         item.addEventListener("click",()=>{
            onSelect?.(stock)
        })
        dropdown.append(item);

    });
    return dropdown;
}
