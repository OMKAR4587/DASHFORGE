function formatNumber(value) {
    if (value === null || value === undefined || value === "") {
        return "-";
    }

    const number = Number(value);

    if (!Number.isFinite(number)) {
        return "-";
    }

    const abs = Math.abs(number);

    if (abs >= 1_000_000_000_000) {
        return `${(number / 1_000_000_000_000).toFixed(2)}T`;
    }

    if (abs >= 1_000_000_000) {
        return `${(number / 1_000_000_000).toFixed(2)}B`;
    }

    if (abs >= 1_000_000) {
        return `${(number / 1_000_000).toFixed(2)}M`;
    }

    return number.toLocaleString();
}

function valueOrDash(value, prefix = "", suffix = "") {
    if (value === null || value === undefined || value === "") {
        return "-";
    }

    return `${prefix}${value}${suffix}`;
}

function percentage(value) {
    if (value === null || value === undefined || value === "") {
        return "-";
    }

    return `${(Number(value) * 100).toFixed(2)}%`;
}

export function financialMetrics(stock) {
    const {
        summaryDetail,
        defaultKeyStatistics,
        financialData,
    } = stock;

    const metrics = [
        {
            label: "P/E Ratio",
            value: valueOrDash(summaryDetail?.trailingPE),
            meta: "Trailing",
            type: "valuation",
        },
        {
            label: "Forward P/E",
            value: valueOrDash(summaryDetail?.forwardPE),
            meta: "Forward estimate",
            type: "valuation",
        },
        {
            label: "EPS",
            value: valueOrDash(
                defaultKeyStatistics?.trailingEps,
                "$"
            ),
            meta: "Trailing EPS",
            type: "earnings",
        },
        {
            label: "Dividend Yield",
            value: percentage(summaryDetail?.dividendYield),
            meta: "Annual yield",
            type: "income",
        },
        {
            label: "Beta",
            value: valueOrDash(defaultKeyStatistics?.beta),
            meta: "Market sensitivity",
            type: "risk",
        },
        {
            label: "52W High",
            value: valueOrDash(
                summaryDetail?.fiftyTwoWeekHigh,
                "$"
            ),
            meta: "52 week range",
            type: "range",
        },
        {
            label: "52W Low",
            value: valueOrDash(
                summaryDetail?.fiftyTwoWeekLow,
                "$"
            ),
            meta: "52 week range",
            type: "range",
        },
        {
            label: "Revenue",
            value: formatNumber(financialData?.totalRevenue),
            meta: "Total revenue",
            type: "financial",
        },
        {
            label: "Free Cash Flow",
            value: formatNumber(financialData?.freeCashflow),
            meta: "Available cash",
            type: "financial",
        },
        {
            label: "Total Cash",
            value: formatNumber(financialData?.totalCash),
            meta: "Cash & equivalents",
            type: "financial",
        },
        {
            label: "Total Debt",
            value: formatNumber(financialData?.totalDebt),
            meta: "Outstanding debt",
            type: "financial",
        },
        {
            label: "Shares Outstanding",
            value: formatNumber(
                defaultKeyStatistics?.sharesOutstanding
            ),
            meta: "Shares issued",
            type: "shares",
        },
    ];

    const card = document.createElement("section");

    card.className = "card financial-card";

    card.innerHTML = `
        <div class="financial-top">

            <div class="financial-title-group">

                <div class="financial-title-row">

                    <h3 class="section-title">
                        Financial Metrics
                    </h3>

                    <span class="financial-live">
                        <span></span>
                        FUNDAMENTALS
                    </span>

                </div>

                <p>
                    Key valuation, earnings and balance sheet indicators
                </p>

            </div>

            <div class="financial-summary">

                <span>12</span>

                <small>
                    metrics
                </small>

            </div>

        </div>


        <div class="financial-sections">

            <div class="financial-section">

                <div class="financial-section-label">
                    <span>VALUATION & PERFORMANCE</span>
                    <i></i>
                </div>

                <div class="financial-metrics-grid">

                    ${metrics
                        .slice(0, 7)
                        .map(
                            (metric) => `
                                <div
                                    class="
                                        financial-metric
                                        financial-metric-${metric.type}
                                    "
                                >

                                    <div class="metric-top">
                                        <span class="metric-label">
                                            ${metric.label}
                                        </span>

                                        <span class="metric-indicator"></span>
                                    </div>

                                    <strong class="metric-value">
                                        ${metric.value}
                                    </strong>

                                    <span class="metric-meta">
                                        ${metric.meta}
                                    </span>

                                </div>
                            `
                        )
                        .join("")}

                </div>

            </div>


            <div class="financial-section">

                <div class="financial-section-label">
                    <span>FINANCIAL POSITION</span>
                    <i></i>
                </div>

                <div class="financial-metrics-grid financial-financial-grid">

                    ${metrics
                        .slice(7)
                        .map(
                            (metric) => `
                                <div
                                    class="
                                        financial-metric
                                        financial-metric-${metric.type}
                                    "
                                >

                                    <div class="metric-top">
                                        <span class="metric-label">
                                            ${metric.label}
                                        </span>

                                        <span class="metric-indicator"></span>
                                    </div>

                                    <strong class="metric-value">
                                        ${metric.value}
                                    </strong>

                                    <span class="metric-meta">
                                        ${metric.meta}
                                    </span>

                                </div>
                            `
                        )
                        .join("")}

                </div>

            </div>

        </div>
    `;

    return card;
}