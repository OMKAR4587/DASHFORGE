export function overview(stock) {
    const card = document.createElement("section");

    card.className = "card overview-card";

    const website = stock.website || "";

    card.innerHTML = `
        <div class="overview-header">

            <div class="overview-title-group">

                <div class="overview-title-row">

                    <h3 class="section-title">
                        Company Overview
                    </h3>

                    <span class="overview-badge">
                        COMPANY
                    </span>

                </div>

                <p>
                    Business profile and company information
                </p>

            </div>

            <div class="overview-icon">

                <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <circle cx="12" cy="12" r="9"/>
                    <path d="M12 10v6"/>
                    <path d="M12 7h.01"/>
                </svg>

            </div>

        </div>


        <div class="company-description-wrap">

            <div class="description-accent"></div>

            <p class="company-description">
                ${stock.longBusinessSummary ||
                "No company description available."}
            </p>

        </div>


        <div class="overview-divider"></div>


        <div class="company-facts">

            <div class="company-fact">
                <span class="fact-label">Sector</span>

                <strong class="fact-value">
                    ${stock.sector || "-"}
                </strong>
            </div>


            <div class="company-fact">
                <span class="fact-label">Industry</span>

                <strong class="fact-value">
                    ${stock.industry || "-"}
                </strong>
            </div>


            <div class="company-fact">
                <span class="fact-label">Employees</span>

                <strong class="fact-value">
                    ${
                        stock.fullTimeEmployees
                            ? stock.fullTimeEmployees.toLocaleString()
                            : "-"
                    }
                </strong>
            </div>


            <div class="company-fact">
                <span class="fact-label">Country</span>

                <strong class="fact-value">
                    ${stock.country || "-"}
                </strong>
            </div>


            <div class="company-fact company-fact-website">

                <span class="fact-label">
                    Website
                </span>

                ${
                    website
                        ? `
                            <a
                                class="company-website"
                                href="${website}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span>
                                    ${website.replace(/^https?:\/\//, "")}
                                </span>

                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M7 17 17 7"/>
                                    <path d="M7 7h10v10"/>
                                </svg>
                            </a>
                        `
                        : `
                            <strong class="fact-value">
                                -
                            </strong>
                        `
                }

            </div>

        </div>

    `;

    return card;
}