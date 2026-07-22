import { initChart } from "./api/Chart.js";
import { main } from "./components/layout/main.js";
import {initCategoryTabs,renderStockList } from "./components/small-features/stockList.js";
const app = document.getElementById('app');

app.append(
    main()
);
initChart()
renderStockList()
initCategoryTabs()
lucide.createIcons();