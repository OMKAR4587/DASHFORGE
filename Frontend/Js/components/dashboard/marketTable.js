const marketData = [
  {
    sector: "FINANCIAL",
    stocks: [
      {
        symbol: "JPM",
        name: "JPMorgan Chase",
        price: "359.79",
        change: "2.27",
      },
      {
        symbol: "WFC",
        name: "Wells Fargo Co New",
        price: "87.52",
        change: "0.27",
      },
      {
        symbol: "BAC",
        name: "Bank America Corp",
        price: "63.86",
        change: "0.69",
      },
      {
        symbol: "HBAN",
        name: "Hibc Hldgs Plc",
        price: "103.32",
        change: "-0.41",
      },
      {
        symbol: "C",
        name: "Citigroup Inc",
        price: "135.22",
        change: "0.22",
      },
      {
        symbol: "MA",
        name: "Mastercard Incorporated",
        price: "163.17",
        change: "0.22",
      },
    ],
  },

  {
    sector: "TECHNOLOGY",
    stocks: [
      {
        symbol: "AAPL",
        name: "Apple",
        price: "308.26",
        change: "-5.07",
      },
      {
        symbol: "GOOGL",
        name: "Alphabet",
        price: "357.52",
        change: "3.22",
      },
      {
        symbol: "MSFT",
        name: "Microsoft",
        price: "406.06",
        change: "6.07",
      },
      {
        symbol: "META",
        name: "Meta Platforms",
        price: "635.90",
        change: "4.02",
      },
      {
        symbol: "ORCL",
        name: "Oracle Corp",
        price: "151.05",
        change: "4.03",
      },
      {
        symbol: "INTC",
        name: "Intel Corp",
        price: "97.50",
        change: "-4.13",
      },
    ],
  },

  {
    sector: "SERVICES",
    stocks: [
      {
        symbol: "NFLX",
        name: "Netflix",
        price: "118.20",
        change: "2.14",
      },
      {
        symbol: "AMZN",
        name: "Amazon",
        price: "221.43",
        change: "1.87",
      },
      {
        symbol: "UBER",
        name: "Uber",
        price: "91.32",
        change: "-0.84",
      },
    ],
  },
];

export function marketTable() {
  const section = document.createElement("section");

  section.className = "market-table-card";

  const totalStocks = marketData.reduce(
    (total, sector) => total + sector.stocks.length,
    0,
  );

  section.innerHTML = `
        <div class="market-card-header">

            <div class="market-card-heading">
                <div class="market-card-icon">
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M3 3v18h18"/>
                        <path d="m7 16 4-5 3 3 5-7"/>
                    </svg>
                </div>

                <div>
                    <h2>Market Overview</h2>
                    <p>Latest market movements</p>
                </div>
            </div>

            <div class="market-card-count">
                <strong>${totalStocks}</strong>
                <span>Stocks</span>
            </div>

        </div>


        <div class="market-table">

            ${marketData
              .map(
                ({ sector, stocks }) => `
                        <div class="market-sector">

                            <div class="market-sector-heading">

                                <span class="market-sector-name">
                                    ${sector}
                                </span>

                                <span class="market-sector-count">
                                    ${stocks.length}
                                </span>

                                <span class="market-sector-divider"></span>

                            </div>


                            <div class="market-stock-list">

                                ${stocks
                                  .map((stock) => {
                                    const change = Number(stock.change);
                                    const positive = change >= 0;

                                    return `
                                            <div
                                                class="market-stock"
                                                data-symbol="${stock.symbol}"
                                            >

                                                <div class="market-stock-identity">

                                                    <div class="stock-logo">
                                                       <img src="https://financialmodelingprep.com/image-stock/${stock.symbol}.png"/>
                                                    </div>

                                                    <div class="stock-details">

                                                        <span class="stock-symbol">
                                                            ${stock.symbol}
                                                        </span>

                                                        <span class="stock-company">
                                                            ${stock.name}
                                                        </span>

                                                    </div>

                                                </div>


                                                <div class="market-stock-value">

                                                    <span class="stock-price">
                                                        $${stock.price}
                                                    </span>

                                                    <span
                                                        class="
                                                            stock-movement
                                                            ${
                                                              positive
                                                                ? "is-positive"
                                                                : "is-negative"
                                                            }
                                                        "
                                                    >
                                                        <span>
                                                            ${positive ? "↑" : "↓"}
                                                        </span>

                                                        ${positive ? "+" : ""}
                                                        ${stock.change}%
                                                    </span>

                                                </div>

                                                <div class="market-stock-arrow">
                                                    <svg
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        stroke-width="1.8"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    >
                                                        <path d="m9 18 6-6-6-6"/>
                                                    </svg>
                                                </div>

                                            </div>
                                        `;
                                  })
                                  .join("")}

                            </div>

                        </div>
                    `,
              )
              .join("")}

        </div>
    `;

  return section;
}
