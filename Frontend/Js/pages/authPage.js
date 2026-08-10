import { navigate } from "../router/router.js";

export function authPage() {

    const page = document.createElement("div");

    page.className = "auth-page";

    page.innerHTML = `
        <section class="auth-left">

            <div class="auth-content">

                <div class="auth-brand">

                    <div class="auth-logo">
                        <i data-lucide="chart-no-axes-combined"></i>
                    </div>

                    <span>DashForge</span>

                </div>

                <div class="auth-heading">

                    <span class="auth-eyebrow">
                        MARKET INTELLIGENCE
                    </span>

                    <h1>
                        Your market.
                        <span>Your dashboard.</span>
                    </h1>

                    <p>
                        Track stocks, explore market data and
                        manage your personal watchlist from one
                        powerful dashboard.
                    </p>

                </div>

                <div class="auth-actions">

                    <button
                        class="auth-btn auth-btn-primary"
                        id="auth-login"
                    >
                        Login
                        <i data-lucide="arrow-right"></i>
                    </button>

                    <button
                        class="auth-btn auth-btn-secondary"
                        id="auth-signup"
                    >
                        Create account
                    </button>

                </div>

                <p class="auth-note">
                    Simple. Fast. Built for your market workflow.
                </p>

            </div>

        </section>


        <section class="auth-preview">

            <div class="preview-window">

                <div class="preview-header">

                    <div class="preview-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <span>DashForge</span>

                </div>

                <div class="preview-placeholder">

                </div>

            </div>

        </section>
    `;


    page.querySelector("#auth-login")
        .addEventListener("click", () => {
            navigate("/login");
        });


    page.querySelector("#auth-signup")
        .addEventListener("click", () => {
            navigate("/signup");
        });


    return page;
}