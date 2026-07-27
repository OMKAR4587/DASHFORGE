export function companyHeader(stock) {

    const section = document.createElement("section");

    section.className = "company-header";

    section.innerHTML = `

     <div class="company-left">

            <img
                src="https://financialmodelingprep.com/image-stock/${stock.symbol}.png"
                class="company-logo"
                onerror="this.src='../../../Assets/imgs/default-stock.png'"
            />

            <div>

                <h1>${stock.name}</h1>

                <p>${stock.exchange}</p>

            </div>

        </div>

        <div class="company-right">

            <h2>$${Number(stock.price).toFixed(2)}</h2>

           <span class="${stock.change >= 0 ? "price-up" : "price-down"}">

             ${stock.change > 0 ? "+" : ""}${stock.change}

            (${stock.percent > 0 ? "+" : ""}${stock.percent}%)

           </span>

        </div>
    `;
    return section
}