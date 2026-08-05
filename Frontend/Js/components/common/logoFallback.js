export function logoFallback(img, symbol) {
    if(!img) return;
    const fallback = document.createElement("div");

    fallback.className = "stock-logo-fallback";

    fallback.textContent = symbol;

    img.parentElement.appendChild(fallback);

    img.onerror = () => {

        img.style.display = "none";

        fallback.style.display = "flex";

    };

}