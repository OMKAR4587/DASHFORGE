
export function marketTable(){
    const table = document.createElement("div");
    table.className = "market-heatmap";
    table.innerHTML = `
        <h2>Market Summary</h2>
        <table>
            <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Change</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>AAPL</td>
                    <td>Apple Inc.</td>
                    <td>$150.00</td>
                    <td>+2.5%</td>
                </tr>
                <!-- Add more rows as needed -->
            </tbody>
        </table>
    `;
    return table;
}
