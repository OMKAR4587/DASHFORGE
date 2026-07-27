export function stockChart(){

    const section = document.createElement("section");

    section.className = "card stock-chart-card";

    section.innerHTML = `

        <div class="stock-chart-header">

            <div>

                <h3>Price Chart</h3>

                <p>Interactive price history</p>

            </div>

            <div class="chart-actions">

                <!-- पुढे toolbar -->

            </div>

        </div>

        <div id="stock-chart"></div>

    `;

    return section;

}