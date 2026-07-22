
export function summaryCard(){
  const section = document.createElement("section");
  section.className = "summary-card";
  section.innerHTML = `
    <div class="summary-card-item">
      <h3>Total Stocks</h3>
      <p>1,234</p>
    </div>
  `;
  return section;
}
