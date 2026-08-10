import { navigate } from "../router/router.js";

export function signupPage() {

    const page = document.createElement("div");

    page.className = "signup-page";

    page.innerHTML = `
        <div class="signup-container">

            <!-- LEFT -->
            <section class="signup-panel">

                <div class="signup-form-wrapper">

                    <!-- Brand -->
                    <button
                        class="signup-brand"
                        id="signup-brand"
                    >
                        <span class="signup-logo">
                            <i data-lucide="chart-no-axes-combined"></i>
                        </span>

                        <span>DashForge</span>
                    </button>


                    <!-- Heading -->
                    <div class="signup-heading">

                        <span class="signup-eyebrow">
                            GET STARTED
                        </span>

                        <h1>
                            Create your account
                        </h1>

                        <p>
                            Set up your DashForge account and
                            start building your personal market dashboard.
                        </p>

                    </div>


                    <!-- FORM -->
                    <form
                        id="signup-form"
                        class="signup-form"
                    >

                        <!-- NAME -->
                        <div class="signup-field">

                            <label for="signup-name">
                                Full name
                            </label>

                            <div class="signup-input-wrapper">

                                <i data-lucide="user"></i>

                                <input
                                    id="signup-name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    autocomplete="name"
                                    required
                                />

                            </div>

                        </div>


                        <!-- EMAIL -->
                        <div class="signup-field">

                            <label for="signup-email">
                                Email address
                            </label>

                            <div class="signup-input-wrapper">

                                <i data-lucide="mail"></i>

                                <input
                                    id="signup-email"
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    autocomplete="email"
                                    required
                                />

                            </div>

                        </div>


                        <!-- PASSWORD -->
                        <div class="signup-field">

                            <label for="signup-password">
                                Password
                            </label>

                            <div class="signup-input-wrapper">

                                <i data-lucide="lock"></i>

                                <input
                                    id="signup-password"
                                    type="password"
                                    name="password"
                                    placeholder="Create a password"
                                    autocomplete="new-password"
                                    minlength="6"
                                    required
                                />

                                <button
                                    type="button"
                                    id="toggle-signup-password"
                                    class="signup-password-toggle"
                                    aria-label="Show password"
                                >
                                    <i data-lucide="eye"></i>
                                </button>

                            </div>

                            <span class="signup-hint">
                                Use at least 6 characters.
                            </span>

                        </div>


                        <!-- CONFIRM PASSWORD -->
                        <div class="signup-field">

                            <label for="signup-confirm-password">
                                Confirm password
                            </label>

                            <div class="signup-input-wrapper">

                                <i data-lucide="shield-check"></i>

                                <input
                                    id="signup-confirm-password"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    autocomplete="new-password"
                                    required
                                />

                            </div>

                        </div>


                        <div
                            id="signup-message"
                            class="signup-message"
                            aria-live="polite"
                        ></div>


                        <!-- SUBMIT -->
                        <button
                            type="submit"
                            class="signup-submit"
                        >
                            <span>Create account</span>

                            <i data-lucide="arrow-right"></i>
                        </button>

                    </form>


                    <!-- LOGIN -->
                    <div class="signup-login">

                        <span>
                            Already have an account?
                        </span>

                        <button id="signup-login-btn">
                            Login
                        </button>

                    </div>


                    <p class="signup-footer">
                        By creating an account, you agree to our
                        Terms of Service and Privacy Policy.
                    </p>

                </div>

            </section>


            <!-- RIGHT PREVIEW -->
            <section class="signup-preview">

                <div class="signup-preview-content">

                    <span class="signup-preview-badge">

                        <i data-lucide="rocket"></i>

                        START YOUR JOURNEY

                    </span>


                    <h2>
                        Build your own
                        <span>market workspace.</span>
                    </h2>


                    <p>
                        Save the stocks you care about, follow
                        market movements and keep everything
                        organized in one place.
                    </p>


                    <div class="signup-feature-list">

                        <div class="signup-feature">

                            <span class="feature-icon">
                                <i data-lucide="search"></i>
                            </span>

                            <div>
                                <strong>
                                    Discover stocks
                                </strong>

                                <p>
                                    Search and explore market data quickly.
                                </p>
                            </div>

                        </div>


                        <div class="signup-feature">

                            <span class="feature-icon">
                                <i data-lucide="star"></i>
                            </span>

                            <div>
                                <strong>
                                    Build your watchlist
                                </strong>

                                <p>
                                    Keep your favourite stocks close.
                                </p>
                            </div>

                        </div>


                        <div class="signup-feature">

                            <span class="feature-icon">
                                <i data-lucide="chart-candlestick"></i>
                            </span>

                            <div>
                                <strong>
                                    Monitor the market
                                </strong>

                                <p>
                                    Understand price movements at a glance.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    `;


    /* =========================
       BRAND → AUTH PAGE
    ========================= */

    page.querySelector("#signup-brand")
        .addEventListener("click", () => {

            navigate("/");

        });


    /* =========================
       LOGIN
    ========================= */

    page.querySelector("#signup-login-btn")
        .addEventListener("click", () => {

            navigate("/login");

        });


    /* =========================
       PASSWORD VISIBILITY
    ========================= */

    page.querySelector("#toggle-signup-password")
        .addEventListener("click", () => {

            const password =
                page.querySelector("#signup-password");

            const button =
                page.querySelector("#toggle-signup-password");

            if (!password || !button) {
                return;
            }

            if (password.type === "password") {

                password.type = "text";

                button.innerHTML = `
                <i data-lucide="eye-off"></i>
            `;

            } else {

                password.type = "password";

                button.innerHTML = `
                <i data-lucide="eye"></i>
            `;

            }

            lucide.createIcons();

        });


    /* =========================
       FORM
    ========================= */

    page.querySelector("#signup-form")
        .addEventListener("submit", async (event) => {

            event.preventDefault();


            const name =
                page.querySelector("#signup-name")
                    .value
                    .trim();

            const email =
                page.querySelector("#signup-email")
                    .value
                    .trim();

            const password =
                page.querySelector("#signup-password")
                    .value;

            const confirmPassword =
                page.querySelector(
                    "#signup-confirm-password"
                ).value;


            const message =
                page.querySelector("#signup-message");


            /* PASSWORD MATCH */

            if (password !== confirmPassword) {

                message.textContent =
                    "Passwords do not match.";

                message.className =
                    "signup-message error";

                return;

            }

            try {

                const response = await fetch(
                    "http://localhost:5000/auth/signup",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            name,
                            email,
                            password
                        })
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Signup failed"
                    );
                }

                message.textContent =
                    "Account created successfully!";

                message.className =
                    "signup-message success";

                setTimeout(() => {
                    navigate("/login");
                }, 1000);

            } catch (error) {

                console.error(error);

                message.textContent =
                    error.message || "Something went wrong.";

                message.className =
                    "signup-message error";
            }
        });


    return page;
}