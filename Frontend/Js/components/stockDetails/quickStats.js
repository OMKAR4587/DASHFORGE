function formatNumber(value) {

    if (!value) return "-";

    if (value >= 1_000_000_000_000) {
        return (value / 1_000_000_000_000).toFixed(2) + "T";
    }

    if (value >= 1_000_000_000) {
        return (value / 1_000_000_000).toFixed(2) + "B";
    }

    if (value >= 1_000_000) {
        return (value / 1_000_000).toFixed(2) + "M";
    }

    return value.toLocaleString();
}

export function quickStats(stock) {

    const card = document.createElement("section");

    card.className = "card quick-stats";

    card.innerHTML = `
        <h3 class="section-title">Quick Stats</h3>

        <div class="stats-list">

            <div class="stat-row">
                <span>Open</span>
                <strong>$${stock.regularMarketOpen ?? "-"}</strong>
            </div>

            <div class="stat-row">
                <span>Previous Close</span>
                <strong>$${stock.regularMarketPreviousClose ?? "-"}</strong>
            </div>

            <div class="stat-row">
                <span>Day High</span>
                <strong>$${stock.regularMarketDayHigh ?? "-"}</strong>
            </div>

            <div class="stat-row">
                <span>Day Low</span>
                <strong>$${stock.regularMarketDayLow ?? "-"}</strong>
            </div>

            <div class="stat-row">
                <span>Volume</span>
                <strong>${formatNumber(stock.regularMarketVolume)}</strong>
            </div>

            <div class="stat-row">
                <span>Market Cap</span>
                <strong>${formatNumber(stock.marketCap)}</strong>
            </div>

        </div>
    `;

    return card;
}