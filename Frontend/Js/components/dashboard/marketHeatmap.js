import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const {
  hierarchy,
  treemap,
  treemapSquarify,
  select,
  zoom,
  zoomIdentity
} = d3;
import { getStockData } from "../../api/searchApi.js";
import { navigate } from "../../router/router.js";


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
      "TXN"
    ]
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
      "T"
    ]
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
      "MA"
    ]
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
      "AMGN"
    ]
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
      "BKNG"
    ]
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
      "CL"
    ]
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
      "PSX"
    ]
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
      "LMT"
    ]
  },

  {
    name: "Utilities",
    symbols: [
      "NEE",
      "DUK",
      "SO",
      "CEG",
      "AEP",
      "SRE"
    ]
  },

  {
    name: "Real Estate",
    symbols: [
      "PLD",
      "AMT",
      "EQIX",
      "PSA",
      "SPG",
      "O"
    ]
  },

  {
    name: "Basic Materials",
    symbols: [
      "LIN",
      "APD",
      "SHW",
      "FCX",
      "NEM",
      "NUE"
    ]
  }

];


/* =========================================================
   COMPANY LOGOS
========================================================= */

const companyDomains = {

  NVDA: "nvidia.com",
  AAPL: "apple.com",
  MSFT: "microsoft.com",
  AVGO: "broadcom.com",
  ORCL: "oracle.com",
  AMD: "amd.com",
  INTC: "intel.com",
  CRM: "salesforce.com",
  ADBE: "adobe.com",
  CSCO: "cisco.com",
  QCOM: "qualcomm.com",
  TXN: "ti.com",

  GOOGL: "google.com",
  META: "meta.com",
  NFLX: "netflix.com",
  DIS: "disney.com",
  TMUS: "t-mobile.com",
  VZ: "verizon.com",
  T: "att.com",

  JPM: "jpmorganchase.com",
  BAC: "bankofamerica.com",
  WFC: "wellsfargo.com",
  GS: "goldmansachs.com",
  MS: "morganstanley.com",
  C: "citi.com",
  BLK: "blackrock.com",
  SCHW: "schwab.com",
  AXP: "americanexpress.com",
  USB: "usbank.com",
  MA: "mastercard.com",

  LLY: "lilly.com",
  JNJ: "jnj.com",
  ABBV: "abbvie.com",
  MRK: "merck.com",
  UNH: "unitedhealthgroup.com",
  PFE: "pfizer.com",
  TMO: "thermofisher.com",
  ABT: "abbott.com",
  DHR: "danaher.com",
  AMGN: "amgen.com",

  AMZN: "amazon.com",
  TSLA: "tesla.com",
  HD: "homedepot.com",
  NKE: "nike.com",
  MCD: "mcdonalds.com",
  LOW: "lowes.com",
  TJX: "tjx.com",
  BKNG: "bookingholdings.com",

  WMT: "walmart.com",
  COST: "costco.com",
  PG: "pg.com",
  KO: "coca-cola.com",
  PEP: "pepsico.com",
  PM: "pmi.com",
  MO: "altria.com",
  CL: "colgatepalmolive.com",

  XOM: "exxonmobil.com",
  CVX: "chevron.com",
  COP: "conocophillips.com",
  SLB: "slb.com",
  EOG: "eogresources.com",
  OXY: "oxy.com",
  MPC: "marathonpetroleum.com",
  PSX: "phillips66.com",

  CAT: "cat.com",
  GE: "ge.com",
  RTX: "rtx.com",
  HON: "honeywell.com",
  UNP: "up.com",
  DE: "deere.com",
  BA: "boeing.com",
  LMT: "lockheedmartin.com",

  NEE: "nexteraenergy.com",
  DUK: "duke-energy.com",
  SO: "southerncompany.com",
  CEG: "constellationenergy.com",
  AEP: "aep.com",
  SRE: "sempra.com",

  PLD: "prologis.com",
  AMT: "americantower.com",
  EQIX: "equinix.com",
  PSA: "publicstorage.com",
  SPG: "simon.com",
  O: "realtyincome.com",

  LIN: "linde.com",
  APD: "airproducts.com",
  SHW: "sherwin-williams.com",
  FCX: "fcx.com",
  NEM: "newmont.com",
  NUE: "nucor.com"

};


function getLogo(symbol) {
  // const domain = companyDomains[symbol];
  console.log(symbol)

  if (!symbol) {
    return null;
  }

  return `https://financialmodelingprep.com/image-stock/${symbol}.png`;
}


/* =========================================================
   HELPERS
========================================================= */

function number(value) {

  const parsed =
    Number(value);

  return Number.isFinite(parsed)
    ? parsed
    : 0;

}


function getRaw(value) {

  if (
    value &&
    typeof value === "object" &&
    "raw" in value
  ) {
    return number(value.raw);
  }

  return number(value);

}


/* =========================================================
   MARKET CAP
========================================================= */

function getMarketCap(data) {

  return getRaw(
    data?.defaultKeyStatistics?.marketCap
  )
    ||
    getRaw(
      data?.summaryDetail?.marketCap
    )
    ||
    getRaw(
      data?.financialData?.marketCap
    )
    ||
    getRaw(
      data?.marketCap
    );

}


/* =========================================================
   CURRENT PRICE
========================================================= */

function getPrice(data) {

  return getRaw(
    data?.financialData?.currentPrice
  )
    ||
    getRaw(
      data?.summaryDetail?.regularMarketPrice
    )
    ||
    getRaw(
      data?.summaryDetail?.previousClose
    );

}


/* =========================================================
   CHANGE %
========================================================= */

function getChange(data) {

  /*
   * If API gives percentage directly.
   */

  const directChange =
    data?.percent_change ??
    data?.percentageChange ??
    data?.changePercent;

  if (
    directChange !== undefined &&
    directChange !== null
  ) {

    return number(
      directChange
    );

  }


  /*
   * Otherwise calculate from:
   *
   * current price
   * previous close
   */

  const current =
    getPrice(data);

  const previous =
    getRaw(
      data?.summaryDetail?.previousClose
    );


  if (
    current &&
    previous
  ) {

    return (
      (current - previous) /
      previous
    ) * 100;

  }


  return 0;

}


/* =========================================================
   COMPANY NAME
========================================================= */

function getCompanyName(
  data,
  symbol
) {

  return (
    data?.assetProfile?.longName ||
    data?.assetProfile?.shortName ||
    data?.quoteType?.longName ||
    data?.name ||
    symbol
  );

}


/* =========================================================
   FETCH STOCK
========================================================= */

async function fetchStock(
  symbol,
  sector
) {

  try {

    const response =
      await getStockData(
        symbol
      );


    /*
     * Your API returns:
     *
     * {
     *   assetProfile,
     *   recommendationTrend,
     *   summaryDetail,
     *   defaultKeyStatistics,
     *   financialData
     * }
     */

    const data =
      response?.data ||
      response?.result ||
      response ||
      {};


    const marketCap =
      getMarketCap(data);


    /*
     * Don't show invalid
     * zero-sized stocks.
     */

    if (!marketCap) {

      console.warn(
        `No market cap: ${symbol}`
      );

      return null;

    }


    return {

      symbol,

      sector,

      name:
        getCompanyName(
          data,
          symbol
        ),

      price:
        getPrice(data),

      change:
        getChange(data),

      marketCap,

      logo:
        getLogo(symbol)

    };

  } catch (error) {

    console.error(
      `Heatmap API failed: ${symbol}`,
      error
    );

    return null;

  }

}


/* =========================================================
   FETCH ENTIRE MARKET
========================================================= */

async function getHeatmapData() {

  const sectorResults =
    await Promise.all(

      sectors.map(
        async sector => {

          const stocks =
            await Promise.all(
              sector.symbols.map(
                symbol =>
                  fetchStock(
                    symbol,
                    sector.name
                  )
              )
            );


          return {

            name:
              sector.name,

            children:
              stocks.filter(
                Boolean
              )

          };

        }
      )

    );


  return {

    name: "Market",

    children:
      sectorResults.filter(
        sector =>
          sector.children.length
      )

  };

}


/* =========================================================
   COLOR SCALE
========================================================= */

function getHeatmapColor(
  change
) {

  /*
   * Clamp between -5% and +5%.
   */

  const value =
    Math.max(
      -5,
      Math.min(
        5,
        change
      )
    );


  /*
   * Neutral
   */

  if (value === 0) {

    return "hsl(220 8% 46%)";

  }


  /*
   * RED
   */

  if (value < 0) {

    const intensity =
      Math.abs(value) / 5;


    const saturation =
      58 + intensity * 25;


    const lightness =
      50 - intensity * 18;


    return `
            hsl(
                2
                ${saturation}%
                ${lightness}%
            )
        `;

  }


  /*
   * GREEN
   */

  const intensity =
    value / 5;


  const saturation =
    55 + intensity * 28;


  const lightness =
    50 - intensity * 18;


  return `
        hsl(
            145
            ${saturation}%
            ${lightness}%
        )
    `;

}


/* =========================================================
   MARKET CAP FORMAT
========================================================= */

function formatMarketCap(
  value
) {

  if (!value) {
    return "N/A";
  }


  if (value >= 1e12) {

    return `$${(
      value / 1e12
    ).toFixed(2)}T`;

  }


  if (value >= 1e9) {

    return `$${(
      value / 1e9
    ).toFixed(2)}B`;

  }


  if (value >= 1e6) {

    return `$${(
      value / 1e6
    ).toFixed(2)}M`;

  }


  return `$${value.toFixed(0)}`;

}


/* =========================================================
   CHANGE FORMAT
========================================================= */

function formatChange(
  change
) {

  if (!Number.isFinite(change)) {
    return "0.00%";
  }


  return `
        ${change >= 0 ? "+" : ""}
        ${change.toFixed(2)}%
    `;

}


/* =========================================================
   TREEMAP
========================================================= */

function createTreemap(
  data,
  width,
  height
) {

  const root =
    hierarchy(data)

      .sum(
        d =>
          d.marketCap || 0
      )

      .sort(
        (a, b) =>
          b.value - a.value
      );


  return treemap()

    .size([
      width,
      height
    ])

    .tile(
      treemapSquarify.ratio(
        1.15
      )
    )

    .paddingOuter(4)

    .paddingInner(3)

    .paddingTop(
      node =>
        node.depth === 1
          ? 28
          : 3
    )

    .round(true)

    (root);

}


/* =========================================================
   TOOLTIP
========================================================= */

function createTooltip() {

  let tooltip =
    document.querySelector(
      ".heatmap-tooltip"
    );


  if (tooltip) {
    return tooltip;
  }


  tooltip =
    document.createElement(
      "div"
    );


  tooltip.className =
    "heatmap-tooltip";


  document.body.appendChild(
    tooltip
  );


  return tooltip;

}


function showTooltip(event, stock) {
  const tooltip =
    createTooltip();


  tooltip.innerHTML = `

        <div class="heatmap-tooltip-top">

            <div class="heatmap-tooltip-company">

                ${stock.logo
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
                Click to View
            </button>

        </div>


        <div class="heatmap-tooltip-grid">

            <div>

                <span>
                    Price
                </span>

                <strong>
                    $${stock.price.toFixed(2)}
                </strong>

            </div>


            <div>

                <span>
                    Market Cap
                </span>

                <strong>
                    ${formatMarketCap(
      stock.marketCap
    )}
                </strong>

            </div>


            <div>

                <span>
                    Change
                </span>

                <strong
                    class="${stock.change >= 0
      ? "positive"
      : "negative"
    }"
                >
                    ${formatChange(
      stock.change
    )}
                </strong>

            </div>

        </div>

    `;


  tooltip
    .querySelector(
      ".heatmap-tooltip-open"
    )
    ?.addEventListener(
      "click",
      () => {

        hideTooltip();

        navigate(
          `/stock/${stock.symbol}`
        );

      }
    );


  tooltip.classList.add(
    "show"
  );


  moveTooltip(
    event
  );

}


function moveTooltip(event) {

  const tooltip =
    document.querySelector(
      ".heatmap-tooltip"
    );


  if (!tooltip) {
    return;
  }


  const gap =
    16;


  let left =
    event.clientX + gap;


  let top =
    event.clientY + gap;


  const rect =
    tooltip.getBoundingClientRect();


  if (
    left + rect.width >
    window.innerWidth
  ) {

    left =
      event.clientX -
      rect.width -
      gap;

  }


  if (
    top + rect.height >
    window.innerHeight
  ) {

    top =
      event.clientY -
      rect.height -
      gap;

  }


  tooltip.style.left =
    `${left}px`;


  tooltip.style.top =
    `${top}px`;

}


function hideTooltip() {

  const tooltip =
    document.querySelector(
      ".heatmap-tooltip"
    );


  if (tooltip) {

    tooltip.classList.remove(
      "show"
    );

  }

}


/* =========================================================
   TILE CONTENT
========================================================= */

function getTileClass(
  width,
  height
) {

  if (
    width < 55 ||
    height < 42
  ) {

    return "heatmap-tiny";

  }


  if (
    width < 100 ||
    height < 65
  ) {

    return "heatmap-compact";

  }


  return "heatmap-normal";

}


/* =========================================================
   RENDER
========================================================= */

function renderHeatmap(
  container,
  marketData
) {

  const width =
    container.clientWidth;


  if (!width) {

    return;

  }


  const height =
    Math.max(
      460,
      Math.min(
        width * 0.58,
        680
      )
    );


  container.innerHTML = "";


  /*
   * Zoom viewport
   */

  const viewport =
    document.createElement(
      "div"
    );


  viewport.className =
    "heatmap-zoom-viewport";


  viewport.style.height =
    `${height}px`;


  /*
   * Zoom content
   */

  const content =
    document.createElement(
      "div"
    );


  content.className =
    "heatmap-zoom-content";


  content.style.width =
    `${width}px`;


  content.style.height =
    `${height}px`;


  viewport.appendChild(
    content
  );


  container.appendChild(
    viewport
  );


  /*
   * D3 treemap
   */

  const nodes =
    createTreemap(
      marketData,
      width,
      height
    );


  /*
   * SECTOR BLOCKS
   */

  nodes
    .descendants()
    .filter(
      node =>
        node.depth === 1
    )
    .forEach(
      node => {

        const sector =
          document.createElement(
            "div"
          );


        sector.className =
          "heatmap-sector";


        sector.style.left =
          `${node.x0}px`;


        sector.style.top =
          `${node.y0}px`;


        sector.style.width =
          `${Math.max(
            0,
            node.x1 -
            node.x0
          )}px`;


        sector.style.height =
          `${Math.max(
            0,
            node.y1 -
            node.y0
          )}px`;


        sector.innerHTML = `

                    <span>
                        ${node.data.name}
                    </span>

                    <small>
                        ${node.leaves().length
          }
                        stocks
                    </small>

                `;


        content.appendChild(
          sector
        );

      }
    );


  /*
   * STOCK TILES
   */

  nodes
    .leaves()
    .forEach(
      node => {

        const stock =
          node.data;


        const width =
          node.x1 -
          node.x0;


        const height =
          node.y1 -
          node.y0;


        const tile =
          document.createElement(
            "button"
          );


        tile.type =
          "button";


        tile.className =
          `
                    heatmap-stock
                    ${getTileClass(
            width,
            height
          )}
                    `;


        tile.style.left =
          `${node.x0}px`;


        tile.style.top =
          `${node.y0}px`;


        tile.style.width =
          `${Math.max(
            0,
            width
          )}px`;


        tile.style.height =
          `${Math.max(
            0,
            height
          )}px`;


        tile.style.background =
          getHeatmapColor(
            stock.change
          );


        tile.dataset.symbol =
          stock.symbol;


        /*
         * LOGO
         */

        const logoHTML =
          stock.logo
            ? `
                            <div
                                class="heatmap-logo"
                            >

                                <img
                                    src="${stock.logo}"
                                    alt="${stock.symbol}"
                                    loading="lazy"
                                >

                            </div>
                        `
            : `
                            <div
                                class="heatmap-logo heatmap-logo-empty"
                            ></div>
                        `;


        tile.innerHTML = `

                    ${logoHTML}


                    <div
                        class="heatmap-symbol"
                    >
                        ${stock.symbol}
                    </div>


                    <div
                        class="heatmap-change"
                    >
                        ${formatChange(
          stock.change
        )}
                    </div>

                `;


        /*
         * HOVER
         */

        tile.addEventListener(
          "mouseenter",
          event => {

            tile.classList.add(
              "is-hovered"
            );


            showTooltip(
              event,
              stock
            );


            updateInfoBar(
              stock
            );

          }
        );


        tile.addEventListener(
          "mousemove",
          event => {

            moveTooltip(
              event
            );

          }
        );


        tile.addEventListener(
          "mouseleave",
          () => {

            tile.classList.remove(
              "is-hovered"
            );


            hideTooltip();

          }
        );


        /*
         * CLICK
         */

        tile.addEventListener(
          "click",
          () => {

            hideTooltip();


            navigate(
              `/stock/${stock.symbol}`
            );

          }
        );


        content.appendChild(
          tile
        );

      }
    );


  /*
   * ZOOM
   */

  const zoomBehaviour =
    zoom()
      .scaleExtent([
        1,
        4
      ])

      .on(
        "zoom",
        event => {

          content.style.transform =
            `
                        translate(
                            ${event.transform.x}px,
                            ${event.transform.y}px
                        )
                        scale(
                            ${event.transform.k}
                        )
                        `;

        }
      );


  const viewportSelection = select(viewport);

  viewportSelection.call(zoomBehaviour);

  container._heatmapZoom = zoomBehaviour;
  container._heatmapViewport = viewport;
  container._heatmapZoomTarget = viewportSelection;


  /*
   * Store zoom controls
   */

  container._heatmapZoom =
    zoomBehaviour;


  container._heatmapViewport =
    viewport;


  container._heatmapZoomTarget =
    select(viewport);


  /*
   * Default transform
   */

  select(viewport)
    .call(
      zoomBehaviour.transform,
      zoomIdentity
    );

}


/* =========================================================
   INFO BAR
========================================================= */

function updateInfoBar(
  stock
) {

  const bar =
    document.querySelector(
      ".heatmap-stock-info"
    );


  if (!bar) {
    return;
  }


  bar.innerHTML = `

        <div
            class="heatmap-info-company"
        >

            ${stock.logo
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


        <div
            class="heatmap-info-metric"
        >

            <span>
                Price
            </span>

            <strong>
                $${stock.price.toFixed(2)}
            </strong>

        </div>


        <div
            class="heatmap-info-metric"
        >

            <span>
                Market Cap
            </span>

            <strong>
                ${formatMarketCap(
      stock.marketCap
    )}
            </strong>

        </div>


        <div
            class="heatmap-info-metric"
        >

            <span>
                Change
            </span>

            <strong
                class="${stock.change >= 0
      ? "positive"
      : "negative"
    }"
            >
                ${formatChange(
      stock.change
    )}
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


  bar
    .querySelector(
      ".heatmap-info-view"
    )
    ?.addEventListener(
      "click",
      () => {

        navigate(
          `/stock/${stock.symbol}`
        );

      }
    );


  bar.classList.add(
    "visible"
  );

}


/* =========================================================
   COMPONENT
========================================================= */

export function marketHeatmap() {

  const section =
    document.createElement(
      "section"
    );


  section.className =
    "stock-heatmap-card";


  section.innerHTML = `

        <div
            class="stock-heatmap-header"
        >

            <div
                class="heatmap-title"
            >

                <div>

                    <span
                        class="heatmap-eyebrow"
                    >
                        MARKET OVERVIEW
                    </span>


                    <h2>
                        Stock Heatmap
                    </h2>


                    <p>
                        Market performance weighted by
                        company size
                    </p>

                </div>

            </div>


            <div
                class="heatmap-header-right"
            >

                <div
                    class="heatmap-controls"
                >

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


                <div
                    class="heatmap-zoom-controls"
                >

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


        <div
            class="heatmap-container"
        >

            <div
                class="heatmap-loading"
            >
                Loading market data...
            </div>

        </div>





        <div
            class="heatmap-footer"
        >

            <div
                class="heatmap-legend"
            >

                <span>
                    −5%
                </span>


                <i
                    class="legend negative-strong"
                ></i>


                <i
                    class="legend negative"
                ></i>


                <i
                    class="legend negative-light"
                ></i>


                <span>
                    0%
                </span>


                <i
                    class="legend positive-light"
                ></i>


                <i
                    class="legend positive"
                ></i>


                <i
                    class="legend positive-strong"
                ></i>


                <span>
                    +5%
                </span>

            </div>


            <span
                class="heatmap-hint"
            >
                Hover a stock for details · Click to open
            </span>

        </div>

    `;


  /*
   * Range controls
   *
   * Currently visual only.
   * We can connect these to API
   * historical periods later.
   */

  section
    .querySelectorAll(
      ".heatmap-control"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            section
              .querySelectorAll(
                ".heatmap-control"
              )
              .forEach(
                item =>
                  item.classList.remove(
                    "active"
                  )
              );


            button.classList.add(
              "active"
            );

          }
        );

      }
    );


  return section;

}


/* =========================================================
   ZOOM CONTROLS
========================================================= */

function setupZoomControls() {
  const container =
    document.querySelector(".heatmap-container");

  if (!container) {
    return;
  }

  const buttons =
    container.querySelectorAll(".heatmap-zoom-btn");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const action = button.dataset.zoom;
      const zoomBehaviour =
        container._heatmapZoom;

      const target =
        container._heatmapZoomTarget;

      if (!zoomBehaviour || !target) {
        return;
      }

      if (action === "in") {
        target.call(
          zoomBehaviour.scaleBy,
          1.25
        );
      }

      if (action === "out") {
        target.call(
          zoomBehaviour.scaleBy,
          1
        );
      }

      if (action === "reset") {
        target.call(
          zoomBehaviour.transform,
          zoomIdentity
        );
      }
    });
  });
}

/* =========================================================
   INIT
========================================================= */

let heatmapResizeObserver = null;


export async function initMarketHeatmap() {

  const container =
    document.querySelector(
      ".heatmap-container"
    );


  if (!container) {

    console.warn(
      "Heatmap container not found"
    );

    return;

  }


  try {
    let heatmapResizeObserver = null;
    let heatmapMarketData = null;
    let heatmapRenderTimer = null;
    container.innerHTML = `

            <div
                class="heatmap-loading"
            >
                Loading market data...
            </div>

        `;


    heatmapMarketData =
      await getHeatmapData();

    const marketData =
      heatmapMarketData;


    const stockCount =
      marketData.children
        .reduce(
          (
            total,
            sector
          ) =>
            total +
            sector.children.length,
          0
        );


    if (!stockCount) {

      throw new Error(
        "No valid market data available"
      );

    }


    renderHeatmap(
      container,
      marketData
    );


    setupZoomControls();


    /*
     * Responsive redraw
     */

    if (heatmapResizeObserver) {
      heatmapResizeObserver.disconnect();
    }

    heatmapResizeObserver =
      new ResizeObserver(() => {
        clearTimeout(heatmapRenderTimer);

        heatmapRenderTimer =
          setTimeout(() => {
            if (heatmapMarketData) {
              renderHeatmap(
                container,
                heatmapMarketData
              );

              setupZoomControls();
            }
          }, 150);
      });


    heatmapResizeObserver.observe(
      container
    );


  } catch (error) {

    console.error(
      " Heatmap failed:",
      error
    );


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