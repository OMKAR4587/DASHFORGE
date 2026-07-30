export function searchDropdown(stock = []) {
    const dropdown = document.createElement("div");
    dropdown.className = "search-dropdown";

    if (stock.length === 0) {
        dropdown.innerHTML = `
        <div class="search-empty">
           No stocks found
        </div>
        `;
        return dropdown;
    }

    stock.forEach((stock) => {

        const item = document.createElement("div");

        item.className = "search-item";

        item.dataset.symbol = stock.symbol;

        item.innerHTML = `

        <div class="search-left">
        
        <img 
        src="https://financialmodelingprep.com/image-stock/${stock.symbol}.png"
        class="search-logo/>

        <div>

           <h4>${stock.name}</h4>
           <p>${stock.symbol}</p>

        </div>

        </div>`

        dropdown.append(item);
    });

    return dropdown;
}