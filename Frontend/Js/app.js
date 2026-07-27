import { dashboard } from "./pages/dashboard.js";
import { initDashboard } from "./pages/dashboard.js";
import { stockDetails } from "./pages/stockDetail.js";
import { renderPage } from "./utils/renderPage.js";

const app = document.getElementById('app');

    renderPage(stockDetails())

await initDashboard();