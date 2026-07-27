export function stockChart(){

    const card = document.createElement("section");

    card.className = "card stock-chart";

    card.innerHTML = `
        <h3>Price Chart</h3>

        <div id="stock-chart"></div>
    `;

    return card;

}