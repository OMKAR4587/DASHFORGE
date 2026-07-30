export function navbar() {

    const nav = document.createElement("header");

    nav.className = "navbar";

    nav.innerHTML = `

        <div class="navbar-left">

            <img
                src="./Assets/imgs/Logo.jpg"
                class="logo"
                alt="Market Monitor Logo"
            >

            <div class="page-info">

                <h1 class="page-title">
                    Market Monitor
                </h1>

                <p class="page-subtitle">
                    Live Stock Dashboard
                </p>

            </div>

        </div>

        <div class="navbar-center">

            <div class="search-box">

                <i data-lucide="search"></i>

                <input
                    type="text"
                    placeholder="Search stocks, ETFs..."
                >

            </div>

        </div>

        <div class="navbar-right"> 
            <button class="icon-btn moon">
               
                <i data-lucide="moon"></i>

            </button>

            <button class="icon-btn">

                <i data-lucide="bell"></i>

            </button>

            <button class="profile-btn">

                <img
                    src="https://i.pravatar.cc/40"
                    alt="Profile"
                >

                <div>

                    <strong>Rahul</strong>

                    <small>Investor</small>

                </div>

            </button>

        </div>

    `;

    return nav;

}