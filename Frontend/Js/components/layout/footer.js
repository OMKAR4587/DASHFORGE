
export function Footer() {

    const footer = document.createElement("footer");

    footer.className = "market-footer";

    footer.innerHTML = `

        <!-- =====================================================
             FOOTER MAIN
        ====================================================== -->

        <div class="market-footer-main">

            <!-- BRAND -->
            <div class="footer-brand">

                <div class="footer-brand-logo">
                    <BarChart3 size="22"></BarChart3>
                </div>

                <div class="footer-brand-content">

                    <h2>Market Monitor</h2>

                    <p>
                        Track markets, stocks, sectors and
                        financial trends from one place.
                    </p>

                </div>

            </div>


            <!-- MARKET -->
            <div class="footer-column">

                <h3>Markets</h3>

                <a href="/dashboard">
                    <TrendingUp size="16"></TrendingUp>
                    Market Overview
                </a>

                <a href="/dashboard">
                    <BarChart3 size="16"></BarChart3>
                    Market Heatmap
                </a>

                <a href="/dashboard">
                    <TrendingUp size="16"></TrendingUp>
                    Top Movers
                </a>

                <a href="/dashboard">
                    <BarChart3 size="16"></BarChart3>
                    Market Table
                </a>

            </div>


            <!-- DISCOVER -->
            <div class="footer-column">

                <h3>Discover</h3>

                <a href="/dashboard">
                    <Newspaper size="16"></Newspaper>
                    Latest Stories
                </a>

                <a href="/dashboard">
                    <TrendingUp size="16"></TrendingUp>
                    Trending Stocks
                </a>

                <a href="/dashboard">
                    <BarChart3 size="16"></BarChart3>
                    Market Charts
                </a>

            </div>


            <!-- PLATFORM -->
            <div class="footer-column">

                <h3>Platform</h3>

                <a href="#">
                    <ShieldCheck size="16"></ShieldCheck>
                    Data & Security
                </a>

                <a href="#">
                    <Mail size="16"></Mail>
                    Contact
                </a>

                <a href="#">
                    <ShieldCheck size="16"></ShieldCheck>
                    Privacy
                </a>

            </div>


            <!-- SOCIAL -->
            <div class="footer-social-column">

                <h3>Connect</h3>

                <p>
                    Follow Market Monitor for
                    market updates and product news.
                </p>

                <div class="footer-socials">

                    <a
                        href="#"
                        aria-label="GitHub"
                    >
                        <Github size="18"></Github>
                    </a>

                    <a
                        href="#"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size="18"></Linkedin>
                    </a>

                    <a
                        href="#"
                        aria-label="Twitter"
                    >
                        <Twitter size="18"></Twitter>
                    </a>

                    <a
                        href="#"
                        aria-label="Email"
                    >
                        <Mail size="18"></Mail>
                    </a>

                </div>

            </div>

        </div>


        <!-- =====================================================
             FOOTER STATUS
        ====================================================== -->

        <div class="footer-market-status">

            <div class="footer-status-item">

                <span class="footer-status-dot"></span>

                <span>
                    Markets monitored
                </span>

            </div>

            <div class="footer-status-divider"></div>

            <span>
                Real-time market data
            </span>

            <div class="footer-status-divider"></div>

            <span>
                Built for smarter market tracking
            </span>

        </div>


        <!-- =====================================================
             FOOTER BOTTOM
        ====================================================== -->

        <div class="market-footer-bottom">

            <p>
                © ${new Date().getFullYear()}
                Market Monitor. All rights reserved.
            </p>

            <p class="footer-disclaimer">
                Market data may be delayed. Not financial advice.
            </p>

            <button
                class="footer-top-btn"
                type="button"
                aria-label="Back to top"
            >
                <ArrowUp size="17"></ArrowUp>
                <span>Top</span>
            </button>

        </div>

    `;


    /* =====================================================
       BACK TO TOP
    ====================================================== */

    const topButton =
        footer.querySelector(".footer-top-btn");

    topButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =====================================================
       ICON INITIALIZATION
    ====================================================== */

    requestAnimationFrame(() => {

        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }

    });


    return footer;
}