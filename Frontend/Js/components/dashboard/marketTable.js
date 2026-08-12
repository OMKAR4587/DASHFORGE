const marketData = [
    {
        sector: "FINANCIAL",
        stocks: [
            { symbol: "JPM", name: "JPMorgan Chase", price: "359.79", change: "2.27" },
            { symbol: "WFC", name: "Wells Fargo Co New", price: "87.52", change: "0.27" },
            { symbol: "BAC", name: "Bank America Corp", price: "63.86", change: "0.69" },
            { symbol: "HBAN", name: "Hibc Hldgs Plc", price: "103.32", change: "-0.41" },
            { symbol: "C", name: "Citigroup Inc", price: "135.22", change: "0.22" },
            { symbol: "MA", name: "Mastercard Incorporated", price: "163.17", change: "0.22" }
        ]
    },

    {
        sector: "TECHNOLOGY",
        stocks: [
            { symbol: "AAPL", name: "Apple", price: "308.26", change: "-5.07" },
            { symbol: "GOOGL", name: "Alphabet", price: "357.52", change: "3.22" },
            { symbol: "MSFT", name: "Microsoft", price: "406.06", change: "6.07" },
            { symbol: "META", name: "Meta Platforms", price: "635.90", change: "4.02" },
            { symbol: "ORCL", name: "Oracle Corp", price: "151.05", change: "4.03" },
            { symbol: "INTC", name: "Intel Corp", price: "97.50", change: "-4.13" }
        ]
    },

    {
        sector: "SERVICES",
        stocks: [
            { symbol: "NFLX", name: "Netflix", price: "118.20", change: "2.14" },
            { symbol: "AMZN", name: "Amazon", price: "221.43", change: "1.87" },
            { symbol: "UBER", name: "Uber", price: "91.32", change: "-0.84" }
        ]
    }
];


export function marketTable() {
    const section = document.createElement("section");
    section.className = "market-table-card";

    section.innerHTML =
        `

            <div class="market-table-header">

                <span>Name</span>
                <span>Value</span>
                <span>Change</span>

            </div>


            <div class="market-table-body">

                ${marketData.map(section => `

                    <div class="market-sector">

                        <div class="market-sector-title">
                            ${section.sector}
                        </div>


                        ${section.stocks.map(stock => {

            const positive =
                Number(stock.change) >= 0;

            return `

                                <div
                                    class="market-stock-row"
                                    data-symbol="${stock.symbol}"
                                >

                                    <div class="stock-name">

                                        <span class="stock-icon">
                                            ${stock.symbol.charAt(0)}
                                        </span>

                                        <span class="stock-label">
                                            ${stock.name}
                                        </span>

                                    </div>


                                    <span class="stock-price">
                                        ${stock.price}
                                    </span>


                                    <span
                                        class="stock-change
                                        ${positive
                    ? "positive"
                    : "negative"}"
                                    >
                                        ${positive ? "" : ""}${stock.change}
                                    </span>

                                </div>

                            `;
        }).join("")}

                    </div>

                `).join("")}

            </div> 
             `;

             return section
}