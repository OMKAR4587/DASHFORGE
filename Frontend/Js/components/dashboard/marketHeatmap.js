import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

import { getStockData } from "../../api/searchApi.js";
import { navigate } from "../../router/router.js";
import { marketState } from "../../state/marketState.js";

/* =========================================================
   D3
========================================================= */

const { hierarchy, treemap, treemapSquarify } = d3;

/* =========================================================
   MARKET SECTORS
========================================================= */

const sectors = [
  {
    name: "Technology",
    symbols: [
      "NVDA",
      "AAPL",
      "MSFT",
      "AVGO",
      "ORCL",
      "AMD",
      "INTC",
      "CRM",
      "ADBE",
      "CSCO",
      "QCOM",
      "TXN",
      "IBM",
      "NOW",
      "INTU",
    ],
  },

  {
    name: "Communication Services",
    symbols: [
      "GOOGL",
      "META",
      "NFLX",
      "DIS",
      "TMUS",
      "VZ",
      "T",
      "CMCSA",
      "CHTR",
    ],
  },

  {
    name: "Financial Services",
    symbols: [
      "JPM",
      "BAC",
      "WFC",
      "GS",
      "MS",
      "C",
      "BLK",
      "SCHW",
      "AXP",
      "USB",
      "MA",
      "V",
      "COF",
      "PNC",
    ],
  },

  {
    name: "Healthcare",
    symbols: [
      "LLY",
      "JNJ",
      "ABBV",
      "MRK",
      "UNH",
      "PFE",
      "TMO",
      "ABT",
      "DHR",
      "AMGN",
      "BMY",
      "GILD",
    ],
  },

  {
    name: "Consumer Cyclical",
    symbols: [
      "AMZN",
      "TSLA",
      "HD",
      "NKE",
      "MCD",
      "LOW",
      "TJX",
      "BKNG",
      "SBUX",
      "GM",
      "F",
    ],
  },

  {
    name: "Consumer Defensive",
    symbols: [
      "WMT",
      "COST",
      "PG",
      "KO",
      "PEP",
      "PM",
      "MO",
      "CL",
      "MDLZ",
      "KHC",
    ],
  },

  {
    name: "Energy",
    symbols: [
      "XOM",
      "CVX",
      "COP",
      "SLB",
      "EOG",
      "OXY",
      "MPC",
      "PSX",
      "VLO",
      "HAL",
    ],
  },

  {
    name: "Industrials",
    symbols: [
      "CAT",
      "GE",
      "RTX",
      "HON",
      "UNP",
      "DE",
      "BA",
      "LMT",
      "UPS",
      "MMM",
    ],
  },

  {
    name: "Utilities",
    symbols: ["NEE", "DUK", "SO", "CEG", "AEP", "SRE", "D", "EXC"],
  },

  {
    name: "Real Estate",
    symbols: ["PLD", "AMT", "EQIX", "PSA", "SPG", "O", "WELL", "DLR"],
  },

  {
    name: "Basic Materials",
    symbols: ["LIN", "APD", "SHW", "FCX", "NEM", "NUE", "DD", "DOW"],
  },
];

/* =========================================================
   MODULE STATE
========================================================= */

let activeSectorName = null;

let currentMarketData = null;

let resizeObserver = null;

let resizeTimer = null;

let currentZoom = 1;

/* =========================================================
   BASIC HELPERS
========================================================= */

function number(value) {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : 0;
}

function getRaw(value) {
  if (value && typeof value === "object" && "raw" in value) {
    return number(value.raw);
  }

  return number(value);
}

/* =========================================================
   LOGO
========================================================= */

function getLogo(symbol) {
  if (!symbol) {
    return null;
  }

  return `
        https://financialmodelingprep.com/image-stock/${symbol}.png
    `;
}

/* =========================================================
   MARKET CAP
========================================================= */

function getMarketCap(data) {
  return (
    getRaw(data?.defaultKeyStatistics?.marketCap) ||
    getRaw(data?.summaryDetail?.marketCap) ||
    getRaw(data?.financialData?.marketCap) ||
    getRaw(data?.marketCap)
  );
}

/* =========================================================
   PRICE
========================================================= */

function getPrice(data) {
  return (
    getRaw(data?.financialData?.currentPrice) ||
    getRaw(data?.summaryDetail?.regularMarketPrice) ||
    getRaw(data?.summaryDetail?.previousClose)
  );
}

/* =========================================================
   CHANGE %
========================================================= */

function getChange(data) {
  const directChange =
    data?.percent_change ?? data?.percentageChange ?? data?.changePercent;

  if (directChange !== undefined && directChange !== null) {
    return number(directChange);
  }

  const current = getPrice(data);

  const previous = getRaw(data?.summaryDetail?.previousClose);

  if (current && previous) {
    return ((current - previous) / previous) * 100;
  }

  return 0;
}

/* =========================================================
   COMPANY NAME
========================================================= */

function getCompanyName(data, symbol) {
  return (
    data?.assetProfile?.longName ||
    data?.assetProfile?.shortName ||
    data?.quoteType?.longName ||
    data?.name ||
    symbol
  );
}
/* =========================================================
   FETCH SINGLE STOCK
========================================================= */

async function fetchStock(symbol, sector) {
  try {
    const response = await getStockData(symbol);

    const data = response?.data || response?.result || response || {};

    const marketCap = getMarketCap(data);

    /*
     * Ignore stocks where
     * market cap is unavailable.
     */

    if (!marketCap) {
      console.warn(`No market cap available for ${symbol}`);

      return null;
    }

    return {
      symbol,

      sector,

      name: getCompanyName(data, symbol),

      price: getPrice(data),

      change: getChange(data),

      marketCap,

      logo: getLogo(symbol),
    };
  } catch (error) {
    console.error(`Failed to fetch ${symbol}:`, error);

    return null;
  }
}

/* =========================================================
   FETCH ENTIRE MARKET
========================================================= */

async function getHeatmapData() {
  const sectorResults = await Promise.all(
    sectors.map(async (sector) => {
      const stocks = await Promise.all(
        sector.symbols.map((symbol) => fetchStock(symbol, sector.name)),
      );

      return {
        name: sector.name,

        children: stocks.filter(Boolean),
      };
    }),
  );

  return {
    name: "Market",

    children: sectorResults.filter((sector) => sector.children.length > 0),
  };
}

/* =========================================================
   FORMAT MARKET CAP
========================================================= */

function formatMarketCap(value) {
  if (!value) {
    return "N/A";
  }

  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`;
  }

  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  }

  if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  }

  return `$${value.toFixed(0)}`;
}

/* =========================================================
   FORMAT CHANGE
========================================================= */

function formatChange(change) {
  const value = Number(change);

  if (!Number.isFinite(value)) {
    return "0.00%";
  }

  return value >= 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`;
}

/* =========================================================
   COLOR SCALE
========================================================= */

function getHeatmapColor(change) {
  const value = Math.max(-5, Math.min(5, number(change)));

  if (value === 0) {
    return "hsl(220 10% 43%)";
  }

  const intensity = Math.abs(value) / 5;

  const saturation = 55 + intensity * 30;

  const lightness = 48 - intensity * 18;

  if (value > 0) {
    return `
            hsl(
                145
                ${saturation}%
                ${lightness}%
            )
        `;
  }

  return `
        hsl(
            2
            ${saturation}%
            ${lightness}%
        )
    `;
}

/* =========================================================
   TILE SIZE CLASS
========================================================= */

function getTileClass(width, height) {
  if (width < 58 || height < 44) {
    return "heatmap-tiny";
  }

  if (width < 105 || height < 70) {
    return "heatmap-compact";
  }

  return "heatmap-normal";
}

/* =========================================================
   TREEMAP
========================================================= */

function createTreemap(data, width, height) {
  const root = hierarchy(data)
    .sum((d) => d.marketCap || 0)

    .sort((a, b) => b.value - a.value);

  return treemap()
    .size([width, height])

    .tile(treemapSquarify.ratio(1.15))

    .paddingOuter(0)

    .paddingInner(2)

    .paddingTop((node) => (node.depth === 1 ? 28 : 2))

    .round(true)(root);
}
/* =========================================================
   TOOLTIP
========================================================= */

function createTooltip() {
  let tooltip = document.querySelector(".heatmap-tooltip");

  if (tooltip) {
    return tooltip;
  }

  tooltip = document.createElement("div");

  tooltip.className = "heatmap-tooltip";

  document.body.appendChild(tooltip);

  return tooltip;
}

/* =========================================================
   HIDE TOOLTIP
========================================================= */

function hideTooltip() {
  const tooltip = document.querySelector(".heatmap-tooltip");

  if (tooltip) {
    tooltip.classList.remove("show");
  }
}

/* =========================================================
   MOVE TOOLTIP
========================================================= */

function moveTooltip(event) {
  const tooltip = document.querySelector(".heatmap-tooltip");

  if (!tooltip) {
    return;
  }

  const gap = 16;

  let left = event.clientX + gap;

  let top = event.clientY + gap;

  const rect = tooltip.getBoundingClientRect();

  if (left + rect.width > window.innerWidth) {
    left = event.clientX - rect.width - gap;
  }

  if (top + rect.height > window.innerHeight) {
    top = event.clientY - rect.height - gap;
  }

  tooltip.style.left = `${Math.max(8, left)}px`;

  tooltip.style.top = `${Math.max(8, top)}px`;
}

/* =========================================================
   SHOW TOOLTIP
========================================================= */

function showTooltip(event, stock) {
  const tooltip = createTooltip();

  tooltip.innerHTML = `

        <div class="heatmap-tooltip-top">

            <div class="heatmap-tooltip-company">

                ${
                  stock.logo
                    ? `
                            <img
                                src="${stock.logo}"
                                alt="${stock.symbol}"
                            >
                        `
                    : ""
                }

                <div>

                    <strong>
                        ${stock.symbol}
                    </strong>

                    <span>
                        ${stock.name}
                    </span>

                </div>

            </div>

            <button
                class="heatmap-tooltip-open"
                type="button"
            >
                View Stock
            </button>

        </div>


        <div class="heatmap-tooltip-grid">

            <div>

                <span>
                    Price
                </span>

                <strong>
                    $${number(stock.price).toFixed(2)}
                </strong>

            </div>


            <div>

                <span>
                    Market Cap
                </span>

                <strong>
                    ${formatMarketCap(stock.marketCap)}
                </strong>

            </div>


            <div>

                <span>
                    Change
                </span>

                <strong
                    class="${stock.change >= 0 ? "positive" : "negative"}"
                >
                    ${formatChange(stock.change)}
                </strong>

            </div>

        </div>
    `;

  tooltip
    .querySelector(".heatmap-tooltip-open")
    ?.addEventListener("click", () => {
      hideTooltip();

      navigate(`/stock/${stock.symbol}`);
    });

  tooltip.classList.add("show");

  moveTooltip(event);
}

/* =========================================================
   INFO BAR
========================================================= */

function updateInfoBar(stock) {
  const bar = document.querySelector(".heatmap-stock-info");

  if (!bar) {
    return;
  }

  bar.innerHTML = `

        <div class="heatmap-info-company">

            ${
              stock.logo
                ? `
                        <img
                            src="${stock.logo}"
                            alt="${stock.symbol}"
                        >
                    `
                : ""
            }

            <div>

                <strong>
                    ${stock.symbol}
                </strong>

                <span>
                    ${stock.name}
                </span>

            </div>

        </div>


        <div class="heatmap-info-metric">

            <span>
                Price
            </span>

            <strong>
                $${number(stock.price).toFixed(2)}
            </strong>

        </div>


        <div class="heatmap-info-metric">

            <span>
                Market Cap
            </span>

            <strong>
                ${formatMarketCap(stock.marketCap)}
            </strong>

        </div>


        <div class="heatmap-info-metric">

            <span>
                Change
            </span>

            <strong
                class="${stock.change >= 0 ? "positive" : "negative"}"
            >
                ${formatChange(stock.change)}
            </strong>

        </div>


        <button
            class="heatmap-info-view"
            type="button"
        >
            View ${stock.symbol}
            →
        </button>
    `;

  bar.querySelector(".heatmap-info-view")?.addEventListener("click", () => {
    navigate(`/stock/${stock.symbol}`);
  });

  bar.classList.add("visible");
}

export function marketHeatmap() {
  const section = document.createElement("section");

  section.className = "stock-heatmap-card";

  section.innerHTML = `
    <div class="stock-heatmap-header">

      <div class="heatmap-title">
        <span class="heatmap-eyebrow">
          MARKET OVERVIEW
        </span>

        <h2>
          Stock Heatmap
        </h2>

        <p>
          Market performance weighted by company size
        </p>
      </div>

      <div class="heatmap-header-right">

        <div class="heatmap-controls">

          <button
            class="heatmap-control active"
            data-range="1D"
            type="button"
          >
            1D
          </button>

          <button
            class="heatmap-control"
            data-range="1W"
            type="button"
          >
            1W
          </button>

          <button
            class="heatmap-control"
            data-range="1M"
            type="button"
          >
            1M
          </button>

        </div>

        <div class="heatmap-zoom-controls">

          <button
            class="heatmap-zoom-btn"
            data-zoom="out"
            type="button"
            title="Zoom out"
          >
            −
          </button>

          <button
            class="heatmap-zoom-btn"
            data-zoom="reset"
            type="button"
            title="Reset zoom"
          >
            Reset
          </button>

          <button
            class="heatmap-zoom-btn"
            data-zoom="in"
            type="button"
            title="Zoom in"
          >
            +
          </button>

        </div>

      </div>

    </div>

    <div class="heatmap-container">

      <div class="heatmap-loading">
        Loading market data...
      </div>

    </div>

    <div class="heatmap-footer">

      <div class="heatmap-legend">

        <span>−5%</span>

        <i class="legend negative-strong"></i>
        <i class="legend negative"></i>
        <i class="legend negative-light"></i>

        <span>0%</span>

        <i class="legend positive-light"></i>
        <i class="legend positive"></i>
        <i class="legend positive-strong"></i>

        <span>+5%</span>

      </div>

      <span class="heatmap-hint">
        Hover a stock for details · Click to open
      </span>

    </div>
  `;

  /*
   * RANGE BUTTONS
   */

  section.querySelectorAll(".heatmap-control").forEach((button) => {
    button.addEventListener("click", () => {
      section.querySelectorAll(".heatmap-control").forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");
    });
  });

  return section;
}

/* =========================================================
   GET CURRENT DATA TO RENDER
========================================================= */

function getVisibleMarketData(marketData) {
  if (!activeSectorName) {
    return marketData;
  }

  const selectedSector = marketData.children.find(
    (sector) => sector.name === activeSectorName,
  );

  if (!selectedSector) {
    activeSectorName = null;

    return marketData;
  }

  return {
    name: selectedSector.name,

    children: [
      {
        name: selectedSector.name,

        children: selectedSector.children,
      },
    ],
  };
}

/* =========================================================
   CREATE BACK BUTTON
========================================================= */

function createBackButton(container, marketData) {
  if (!activeSectorName) {
    return;
  }

  const button = document.createElement("div");

  button.type = "button";


  button.innerHTML = `
         <Button class="heatmap-back-button">
         <i data-lucide="chevron-down"></i> 
         <p>All Sectors</p>
         </Button>
         <h3 class="selectedHeatmapCategory">${marketState.selectedHeatmapCategory}</h3>
    `;

  button.addEventListener("click", (event) => {
    event.stopPropagation();

    activeSectorName = null;

    currentZoom = 1;
    renderHeatmap(container, marketData);
  });

  container.appendChild(button);
  lucide.createIcons();
}

/* =========================================================
   CREATE SECTOR BLOCK
========================================================= */

function createSectorBlock(node, content, container, marketData) {
  const sector = document.createElement("div");

  sector.className = "heatmap-sector";

  sector.style.left = `${node.x0}px`;

  sector.style.top = `${node.y0}px`;

  sector.style.width = `${Math.max(0, node.x1 - node.x0)}px`;

  sector.style.height = `${Math.max(0, node.y1 - node.y0)}px`;

  sector.innerHTML = `

      <span class="heatmap-section-title-info">

    <strong>

        <button
            type="button"
            class="heatmap-sector-arrow"
            aria-label="Open ${node.data.name}"
        >
            <i data-lucide="chevron-right"></i>
        </button>

        ${node.data.name}

    </strong>

</span>
    `;

  lucide.createIcons();

  /*
   * Category click
   */

  sector
    .querySelector(".heatmap-section-title-info")
    ?.addEventListener("click", (event) => {
      event.stopPropagation();

      activeSectorName = node.data.name;

      marketState.selectedHeatmapCategory = activeSectorName;
      currentZoom = 1;

      renderHeatmap(container, marketData);
    });

  content.appendChild(sector);
}

/* =========================================================
   CREATE STOCK TILE
========================================================= */

function createStockTile(node, content) {
  const stock = node.data;

  const width = node.x1 - node.x0;

  const height = node.y1 - node.y0;

  const tile = document.createElement("button");

  tile.type = "button";

  tile.className = `
        heatmap-stock
        ${getTileClass(width, height)}
    `;

  tile.style.left = `${node.x0}px`;

  tile.style.top = `${node.y0}px`;

  tile.style.width = `${Math.max(0, width)}px`;

  tile.style.height = `${Math.max(0, height)}px`;

  tile.style.background = getHeatmapColor(stock.change);

  tile.dataset.symbol = stock.symbol;

  const logoHTML = stock.logo
    ? `
                <div class="heatmap-logo">

                    <img
                        src="${stock.logo}"
                        alt="${stock.symbol}"
                        loading="lazy"
                    >

                </div>
            `
    : "";

  tile.innerHTML = `

        ${logoHTML}

        <div class="heatmap-symbol">
            ${stock.symbol}
        </div>

        <div class="heatmap-change">
            ${formatChange(stock.change)}
        </div>

    `;

  /*
   * Hover
   */

  tile.addEventListener("mouseenter", (event) => {
    tile.classList.add("is-hovered");

    showTooltip(event, stock);

    updateInfoBar(stock);
  });

  tile.addEventListener("mousemove", moveTooltip);

  tile.addEventListener("mouseleave", () => {
    tile.classList.remove("is-hovered");

    hideTooltip();
  });

  /*
   * Stock click
   */

  tile.addEventListener("click", () => {
    hideTooltip();
    navigate(`/stock/${stock.symbol}`);
  });

  content.appendChild(tile);
}
/* =========================================================
   RENDER HEATMAP
========================================================= */

function renderHeatmap(container, marketData) {
  if (!container) {
    return;
  }

  const width = container.clientWidth;

  if (!width) {
    return;
  }

  const height = Math.max(460, Math.min(width * 0.58, 680));

  container.innerHTML = "";

  /*
   * BACK BUTTON
   */

  createBackButton(container, marketData);

  /*
   * Zoom viewport
   */

  const viewport = document.createElement("div");

  viewport.className = "heatmap-zoom-viewport";

  viewport.style.height = `${height}px`;

  /*
   * Content
   */

  const content = document.createElement("div");

  content.className = "heatmap-zoom-content";

  content.style.width = `${width}px`;

  content.style.height = `${height}px`;

  content.style.transform = `scale(${currentZoom})`;

  content.style.transformOrigin = "top left";

  viewport.appendChild(content);

  container.appendChild(viewport);

  /*
   * Select market / sector
   */

  const visibleData = getVisibleMarketData(marketData);

  /*
   * Build treemap
   */

  const nodes = createTreemap(visibleData, width, height);

  /*
   * Sector blocks
   *
   * Only show sector blocks
   * on main market view.
   */

  if (!activeSectorName) {
    nodes
      .descendants()
      .filter((node) => node.depth === 1)
      .forEach((node) => {
        createSectorBlock(node, content, container, marketData);
      });
  }

  /*
   * Stock tiles
   */

  nodes.leaves().forEach((node) => {
    createStockTile(node, content);
  });

  /*
   * Update zoom transform
   */

  applyZoom(viewport, content);
}

/* =========================================================
   APPLY ZOOM
========================================================= */

function applyZoom(viewport, content) {
  const zoom = Math.max(1, Math.min(2.5, currentZoom));

  currentZoom = zoom;

  content.style.transform = `scale(${zoom})`;

  content.style.transformOrigin = "top left";

  /*
   * Important:
   *
   * No D3 zoom.
   * No selection.call().
   * No interrupt().
   *
   * Therefore:
   *
   * u.interrupt is not a function
   *
   * error cannot happen here.
   */

  if (zoom > 1) {
    viewport.style.overflow = "auto";
  } else {
    viewport.style.overflow = "hidden";
  }
}

/* =========================================================
   ZOOM CONTROLS
========================================================= */

function setupZoomControls() {
  const section = document.querySelector(".stock-heatmap-card");

  if (!section) {
    return;
  }

  const container = section.querySelector(".heatmap-container");

  const viewport = container?.querySelector(".heatmap-zoom-viewport");

  const content = container?.querySelector(".heatmap-zoom-content");

  if (!container || !viewport || !content) {
    return;
  }

  /*
   * Avoid duplicate listeners.
   */

  if (container.dataset.zoomReady === "true") {
    return;
  }

  container.dataset.zoomReady = "true";

  section.querySelectorAll(".heatmap-zoom-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();

      const action = button.dataset.zoom;

      if (action === "in") {
        currentZoom = Math.min(2.5, currentZoom + 0.25);
      }

      if (action === "out") {
        currentZoom = Math.max(1, currentZoom - 0.25);
      }

      if (action === "reset") {
        currentZoom = 1;
      }

      applyZoom(viewport, content);
    });
  });
}

/* =========================================================
   INITIALIZE
========================================================= */

export async function initMarketHeatmap() {
  const container = document.querySelector(".heatmap-container");

  if (!container) {
    console.warn("Heatmap container not found");

    return;
  }

  try {
    container.innerHTML = `

            <div
                class="heatmap-loading"
            >
                Loading market data...
            </div>

        `;

    /*
     * Fetch once.
     */

    currentMarketData = await getHeatmapData();

    /*
     * Validate data.
     */

    const stockCount = currentMarketData.children.reduce(
      (total, sector) => total + sector.children.length,
      0,
    );

    if (!stockCount) {
      throw new Error("No valid market data available");
    }

    /*
     * Initial render
     */

    renderHeatmap(container, currentMarketData);

    /*
     * Zoom buttons
     */

    setupZoomControls();

    /*
     * Responsive resize
     */

    if (resizeObserver) {
      resizeObserver.disconnect();
    }

    resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        if (currentMarketData) {
          renderHeatmap(container, currentMarketData);

          /*
           * New DOM was created,
           * so bind zoom controls again.
           */

          setupZoomControls();
        }
      }, 150);
    });

    resizeObserver.observe(container);
  } catch (error) {
    console.error("Heatmap failed:", error);

    container.innerHTML = `

            <div
                class="heatmap-error"
            >

                <strong>
                    Market data unavailable
                </strong>

                <span>
                    Please try again later.
                </span>

            </div>

        `;
  }
}
