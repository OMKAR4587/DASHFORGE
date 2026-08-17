import { navigate } from "../router/router.js";

export function loginPage() {

    const page = document.createElement("div");

    page.className = "login-page";

    page.innerHTML = `
        <div class="login-container">

            <!-- LEFT: LOGIN FORM -->
            <section class="login-panel">

                <div class="login-form-wrapper">

                    <!-- Brand -->
                    <button class="login-brand" id="login-brand">
                        <span class="login-logo">
                            <i data-lucide="chart-no-axes-combined"></i>
                        </span>

                        <span class="login-brand-name">
                            DashForge
                        </span>
                    </button>


                    <!-- Heading -->
                    <div class="login-heading">

                        <span class="login-eyebrow">
                            WELCOME BACK
                        </span>

                        <h1>
                            Sign in to your account
                        </h1>

                        <p>
                            Continue to your market dashboard
                            and keep track of what matters.
                        </p>

                    </div>


                    <!-- Form -->
                    <form id="login-form" class="login-form">

                        <div class="login-field">

                            <label for="login-email">
                                Email address
                            </label>

                            <div class="login-input-wrapper">

                                <i data-lucide="mail"></i>

                                <input
                                    id="login-email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    autocomplete="email"
                                    required
                                />

                            </div>

                        </div>


                        <div class="login-field">

                            <div class="login-label-row">

                                <label for="login-password">
                                    Password
                                </label>

                                <button
                                    type="button"
                                    id="forgot-password"
                                    class="forgot-password"
                                >
                                    Forgot password?
                                </button>

                            </div>

                            <div class="login-input-wrapper">

                                <i data-lucide="lock"></i>

                                <input
                                    id="login-password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    autocomplete="current-password"
                                    required
                                />

                                <button
                                    type="button"
                                    id="toggle-password"
                                    class="password-toggle"
                                    aria-label="Show password"
                                >
                                    <i data-lucide="eye"></i>
                                </button>

                            </div>

                        </div>


                        <div
                            id="login-message"
                            class="login-message"
                            aria-live="polite"
                        ></div>


                        <button
                            type="submit"
                            class="login-submit"
                        >
                            <span>Sign in</span>
                            <i data-lucide="arrow-right"></i>
                        </button>

                    </form>


                    <!-- Divider -->
                    <div class="login-divider">
                        <span>New to DashForge?</span>
                    </div>


                    <!-- Signup -->
                    <button
                        id="create-account"
                        class="create-account"
                    >
                        Create your account
                    </button>


                    <p class="login-footer">
                        By continuing, you agree to our
                        Terms of Service and Privacy Policy.
                    </p>

                </div>

            </section>


            <!-- RIGHT: PRODUCT PREVIEW -->
            <section class="login-preview">

                <div class="login-preview-content">

                    <span class="preview-badge">
                        <i data-lucide="sparkles"></i>
                        MARKET DASHBOARD
                    </span>

                    <h2>
                        Everything you need
                        <span>in one place.</span>
                    </h2>

                    <p>
                        Monitor markets, discover opportunities,
                        and make better decisions with a dashboard
                        built around your workflow.
                    </p>


                    <div class="preview-card">

                        <div class="preview-card-header">

                            <div class="preview-brand">
                                <span class="mini-logo">
                                    <i data-lucide="chart-no-axes-combined"></i>
                                </span>

                                <span>DashForge</span>
                            </div>

                            <span class="preview-status">
                                Live
                            </span>

                        </div>


                        <div class="preview-chart">

                            <div class="chart-grid"></div>

                            <svg
                                viewBox="0 0 500 180"
                                preserveAspectRatio="none"
                                class="chart-line"
                            >
                                <polyline
                                    points="
                                        0,145
                                        55,132
                                        105,138
                                        155,108
                                        205,116
                                        260,76
                                        315,92
                                        370,58
                                        425,70
                                        500,32
                                    "
                                />
                            </svg>

                        </div>


                        <div class="preview-stats">

                            <div>
                                <span>Portfolio</span>
                                <strong>+12.84%</strong>
                            </div>

                            <div>
                                <span>Market</span>
                                <strong>+4.21%</strong>
                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    `;


    // Go back to landing page

    page.querySelector("#login-brand")
        .addEventListener("click", () => {
            navigate("/");
        });


    // Go to signup

    page.querySelector("#create-account")
        .addEventListener("click", () => {
            navigate("/signup");
        });


    // Password visibility

    page.querySelector("#toggle-password")
        .addEventListener("click", () => {

            const password =
                page.querySelector("#login-password");

            const icon =
                page.querySelector("#toggle-password i");

            if (password.type === "password") {

                password.type = "text";

                icon.setAttribute("data-lucide", "eye-off");

            } else {

                password.type = "password";

                icon.setAttribute("data-lucide", "eye");

            }

            lucide.createIcons();
        });


    // Forgot password - temporary

    page.querySelector("#forgot-password")
        .addEventListener("click", () => {

            const message =
                page.querySelector("#login-message");

            message.textContent =
                "Password recovery will be available soon.";

            message.className =
                "login-message info";
        });


    // Login submit - API next

    page.querySelector("#login-form")
        .addEventListener("submit", async (event) => {

            event.preventDefault();

            const email =
                page.querySelector("#login-email").value.trim();

            const password =
                page.querySelector("#login-password").value;

            const message =
                page.querySelector("#login-message");

            if (!email || !password) {
                return;
            }

            try {

                const response = await fetch(
                    "https://dashforge-3tqz.onrender.com/auth/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email,
                            password
                        })
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Login Failed!"
                    )
                }

                localStorage.setItem(
                    "token",
                    data.token
                )

                message.textContent =
                    "Login successful!";

                message.className =
                    "login-message success";

                setTimeout(() => {
                    navigate("/dashboard")
                }, 500)

            } catch (error) {

                console.error(error);

                message.innerHTML = error.message || "Something went wrong.";

                message.className = "login-message error"

            }

        });


    return page;
}