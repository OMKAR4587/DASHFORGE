function formatNumber(value) {

    if (!value) return "-";

    if (value >= 1_000_000_000_000)
        return (value / 1_000_000_000_000).toFixed(2) + "T";

    if (value >= 1_000_000_000)
        return (value / 1_000_000_000).toFixed(2) + "B";

    if (value >= 1_000_000)
        return (value / 1_000_000).toFixed(2) + "M";

    return value.toLocaleString();
}

export function financialMetrics(stock) {

    const card = document.createElement("section");

    card.className = "card financial-card";

    card.innerHTML = `

        <h3 class="section-title">Financial Metrics</h3>

        <div class="financial-grid">

            <div class="metric-card">
                <span>P/E Ratio</span>
                <strong>${stock.trailingPE}</strong>
            </div>

            <div class="metric-card">
                <span>Forward P/E</span>
                <strong>${stock.forwardPE}</strong>
            </div>

            <div class="metric-card">
                <span>EPS</span>
                <strong>$${stock.epsTrailingTwelveMonths}</strong>
            </div>

            <div class="metric-card">
                <span>Dividend Yield</span>
                <strong>${stock.dividendYield}%</strong>
            </div>

            <div class="metric-card">
                <span>Beta</span>
                <strong>${stock.beta}</strong>
            </div>

            <div class="metric-card">
                <span>52 Week High</span>
                <strong>$${stock.fiftyTwoWeekHigh}</strong>
            </div>

            <div class="metric-card">
                <span>52 Week Low</span>
                <strong>$${stock.fiftyTwoWeekLow}</strong>
            </div>

            <div class="metric-card">
                <span>Revenue</span>
                <strong>${formatNumber(stock.totalRevenue)}</strong>
            </div>

            <div class="metric-card">
                <span>Free Cash Flow</span>
                <strong>${formatNumber(stock.freeCashflow)}</strong>
            </div>

            <div class="metric-card">
                <span>Total Cash</span>
                <strong>${formatNumber(stock.totalCash)}</strong>
            </div>

            <div class="metric-card">
                <span>Total Debt</span>
                <strong>${formatNumber(stock.totalDebt)}</strong>
            </div>

            <div class="metric-card">
                <span>Shares Outstanding</span>
                <strong>${formatNumber(stock.sharesOutstanding)}</strong>
            </div>

        </div>

    `;

    return card;

}