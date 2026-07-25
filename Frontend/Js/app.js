import { dashboard } from "./pages/dashboard.js";
import { initDashboard } from "./pages/dashboard.js";
import { renderPage } from "./utils/renderPage.js";
const app = document.getElementById('app');

app.append(
    renderPage(dashboard())
);

await initDashboard();