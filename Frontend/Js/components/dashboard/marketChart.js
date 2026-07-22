import { createLoader } from "../common/loader.js";

export function marketChart() {
    const section = document.createElement("section");
    section.className = "market-data";
    section.innerHTML = `
         <h2>Market Overview</h2>
     <div class="overview-container">

        
       <section class="chart-header">

            <div class="chart-tabs">
                <button data-range="Financial" class="stock-category-tab active-category-stack">Financial</button>
                <button data-range="Technology" class="stock-category-tab">Technology</button>
                <button data-range="Services" class="stock-category-tab">Services</button>
            </div>

          <div class="stock-list"></div>

        </section>

      <section class="chart-container">
       <div class="chart-wrapper">
        <div id="chart"></div>
       </div>

        <div class="time-filter">
            <button class="range-btn" data-range="1D">1 Day</button>
            <button class="range-btn" data-range="1M">1 Month</button>
            <button class="range-btn" data-range="3M">3 Months</button>
            <button class="range-btn active" data-range="1Y">1 Year</button>
            <button class="range-btn" data-range="5Y">5 Years</button>
            <button class="range-btn" data-range="ALL">ALL</button>
        </div>

      </section>
  
    `;

    const chartWrapper = section.querySelector('.chart-wrapper')
    const loader = createLoader("chart-loader")
    chartWrapper.appendChild(loader);
    return section;
}

