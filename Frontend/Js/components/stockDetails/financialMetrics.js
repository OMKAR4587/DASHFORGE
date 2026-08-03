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

    const {summaryDetail,defaultKeyStatistics,financialData} = stock;

    const card = document.createElement("section");

    card.className = "card financial-card";

    card.innerHTML = `

        <h3 class="section-title">Financial Metrics</h3>

        <div class="financial-grid">

            <div class="metric-card">
                <span>P/E Ratio</span>
                <strong>${summaryDetail?.trailingPE ?? "-"}</strong>
            </div>

            <div class="metric-card">
                <span>Forward P/E</span>
                <strong>${summaryDetail?.forwardPE ?? "-"}</strong>
            </div>

            <div class="metric-card">
                <span>EPS</span>
                <strong>$${defaultKeyStatistics?.trailingEps ?? "-"}</strong>
            </div>

            <div class="metric-card">
                <span>Dividend Yield</span>
                <strong>
                    ${
                        summaryDetail?.dividendYield
                            ? (summaryDetail.dividendYield * 100).toFixed(2)
                            : "-"
                    }%
                </strong>
            </div>

            <div class="metric-card">
                <span>Beta</span>
                <strong>${defaultKeyStatistics?.beta ?? "-"}</strong>
            </div>

            <div class="metric-card">
                <span>52 Week High</span>
                <strong>$${summaryDetail?.fiftyTwoWeekHigh ?? "-"}</strong>
            </div>

            <div class="metric-card">
                <span>52 Week Low</span>
                <strong>$${summaryDetail?.fiftyTwoWeekLow ?? "-"}</strong>
            </div>

            <div class="metric-card">
                <span>Revenue</span>
                <strong>${formatNumber(financialData?.totalRevenue)}</strong>
            </div>

            <div class="metric-card">
                <span>Free Cash Flow</span>
                <strong>${formatNumber(financialData?.freeCashflow)}</strong>
            </div>

            <div class="metric-card">
                <span>Total Cash</span>
                <strong>${formatNumber(financialData?.totalCash)}</strong>
            </div>

            <div class="metric-card">
                <span>Total Debt</span>
                <strong>${formatNumber(financialData?.totalDebt)}</strong>
            </div>

            <div class="metric-card">
                <span>Shares Outstanding</span>
                <strong>${formatNumber(defaultKeyStatistics?.sharesOutstanding)}</strong>
            </div>

        </div>

    `;

    return card;
}