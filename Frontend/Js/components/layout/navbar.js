export function navbar() {
    const nav = document.createElement("header");
    nav.className = "navbar";
    
    nav.innerHTML = `
         <div class="navbar-left">
         <img src='./Assets/imgs/Logo.jpg' alt='logo' class='logo'>
            <h1 class="page-title">
                Dashboard
            </h1>

        </div>

        <div class="navbar-right">

            <div class="search-box">
                
                <input
                    type="text"
                    placeholder="Search stocks..."
                >
                <i data-lucide="search"></i>
            </div>
             <button class="moon">
             <i  data-lucide="moon"></i></button>
            <button class="icon-btn">
               
                <i data-lucide="bell"></i>

            </button>

            <button class="profile-btn">

                <img
                src="https://i.pravatar.cc/40"
                >

                <span>Rahul</span>


            </button>

        </div>

  `;

    return nav;
}