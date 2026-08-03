export function overview(stock) {

    const card = document.createElement("section");

    card.className = "card overview-card";

    card.innerHTML = `
    
        <h3 class="section-title">Overview</h3>

        <p class="company-description">

            ${stock.longBusinessSummary || "No company description available."}

        </p>

        <div class="overview-grid">

            <div class="overview-item">
                <span>Sector</span>
                <strong>${stock.sector || "-"}</strong>
            </div>

            <div class="overview-item">
                <span>Industry</span>
                <strong>${stock.industry || "-"}</strong>
            </div>

            <div class="overview-item">
                <span>Employees</span>
                <strong>${stock.fullTimeEmployees?.toLocaleString() || "-"}</strong>
            </div>

            <div class="overview-item">
                <span>Country</span>
                <strong>${stock.country || "-"}</strong>
            </div>

            <div class="overview-item">
                <span>Website</span>
                <strong><a href=${stock.website}>${stock.website || "-"}</a> </strong>
            </div>

        </div>

    `;

    return card;

}