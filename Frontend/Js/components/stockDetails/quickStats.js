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

export function quickStats(stock,marketCap) {

    const card = document.createElement("section");

    card.className = "card quick-stats";

    card.innerHTML = `
        <h3 class="section-title">Quick Stats</h3>

        <div class="stats-list">

            <div class="stat-row">
                <span>Open</span>
                <strong>$${stock.open ?? "-"}</strong>
            </div>

            <div class="stat-row">
                <span>Previous Close</span>
                <strong>$${stock.previous_close ?? "-"}</strong>
            </div>

            <div class="stat-row">
                <span>Day High</span>
               <strong>$${stock.high ?? "-"}</strong>
            </div>

            <div class="stat-row">
                <span>Day Low</span>
                <strong>$${stock.low ?? "-"}</strong>
            </div>

            <div class="stat-row">
                <span>Volume</span>
                <strong>${formatNumber(stock.volume)}</strong>
            </div>

            <div class="stat-row">
                <span>Market Cap</span>
               <strong>${formatNumber(marketCap)}</strong>
            </div>

        </div>
    `;

    return card;
}