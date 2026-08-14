import { getCurrentUser } from "./api/authApi.js";

import { getNews, getQuote } from "./api/marketApi.js";
import { getStockData } from "./api/searchApi.js";

import { initStcokChart } from "./components/charts/stockChartController.js";

import { authPage } from "./pages/authPage.js";
import { dashboard, initDashboard } from "./pages/dashboard.js";
import { loginPage } from "./pages/login.js";
import { signupPage } from "./pages/signup.js";
import { stockDetails } from "./pages/stockDetail.js";

import { navigate } from "./router/router.js";
import { authState, clearAuth } from "./state/authState.js";

import { marketState } from "./state/marketState.js";
import { renderPage } from "./utils/renderPage.js";


const app = document.getElementById("app");



window.addEventListener("routeChange", async (event) => {

    const path = event.detail.path;

    console.log("ROUTE CHANGE:", path);


    // =====================================================
    // AUTH LANDING PAGE
    // =====================================================

    if (path === "/") {

        const token = localStorage.getItem("token");

        if (!token) {

            renderPage(
                authPage(),
                false
            );

            return;
        }

        try {

            const user = await getCurrentUser();

            authState.user = user;
            authState.isAuthenticated = true;

            navigate("/dashboard");

        } catch (error) {

            console.error(
                "Session restore failed:",
                error
            );

            clearAuth();

            renderPage(
                authPage(),
                false
            );
        }

        return;
    }


    // =====================================================
    // LOGIN
    // =====================================================

    if (path === "/login") {

        renderPage(
            loginPage(),
            false
        );

        return;
    }


    // =====================================================
    // SIGNUP
    // =====================================================

    if (path === "/signup") {

        renderPage(
            signupPage(),
            false
        );

        return;
    }


    // =====================================================
    // DASHBOARD - PROTECTED ROUTE
    // =====================================================

    if (path === "/dashboard") {

        console.log("DASHBOARD ROUTE HIT");


        const token = localStorage.getItem("token");

        console.log("TOKEN:", token);


        // No token → Login
        if (!token) {

            console.log("NO TOKEN");

            navigate("/login");

            return;
        }


        try {

            console.log("CALLING /auth/me");


            // Verify token with backend
            const user = await getCurrentUser();

            authState.user = user;
            authState.isAuthenticated = true;

            const dashboardPage = await dashboard()
            // Render dashboard
            renderPage(
                dashboardPage
            );


            await initDashboard();


        } catch (error) {

            console.error(
                "AUTHENTICATION FAILED:",
                error
            );


            // Remove invalid/expired token
            localStorage.removeItem("token");


            // Send user back to login
            navigate("/login");


        }

        return;
    }


    // =====================================================
    // STOCK DETAIL
    // =====================================================

    if (path.startsWith("/stock/")) {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }
        const symbol = path.split("/")[2]?.toUpperCase();

        if (!symbol) {
            console.error("stock symbol missing from the routes:", path);
            navigate("/dashboard");
            return;
        }

        try {
            const quote = await getQuote(symbol);


            const latestNews = await getNews(symbol);


            const stockData = await getStockData(symbol);

            marketState.selectedStock = {
                symbol
            };

            renderPage(
                stockDetails(
                    quote,
                    stockData,
                    latestNews
                )
            );


            await initStcokChart(symbol);
            lucide.createIcons();

        } catch (error) {

            console.error(
                `Failed to load stock ${symbol}:`,
                error
            );

            navigate("/dashboard");

        }

        return;
    }

});


// =====================================================
// START APPLICATION
// =====================================================

navigate("/");

lucide.createIcons();