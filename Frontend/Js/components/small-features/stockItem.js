import { marketState } from "../../state/marketState.js";
// import borkenImg from "../../../Assets/imgs/brokenImg.png"
export function updateSelectedStock() {

    document
        .querySelectorAll(".stock-item")
        .forEach(item => {

            item.classList.toggle(
                "active-stock",
                item.dataset.symbol === marketState.currSymbol
            );

        });

}
export function createStockItem(stock){

    const item=document.createElement("div");

    item.className="stock-item";
    item.dataset.symbol = stock.symbol;

    if(stock.symbol === marketState.currSymbol){
    item.classList.add("active-stock");
    }


    item.innerHTML=`
    
        <div class="stock-info">

            <div class="stock-logo">
              <img src="https://financialmodelingprep.com/image-stock/${stock.symbol}.png"/>
            </div>

            <div>

                <h4>${stock.symbol}</h4>

                <p>${stock.name}</p>

            </div>

        </div>

        <div class="stock-price">

            <h4>${Number(stock.close).toFixed(2)}</h4>

            <span class"${Number(stock.change)>=0?'positive':'negative'}">
             ${Number(stock.change)>=0?"+":""}
             ${Number(stock.percent_change).toFixed(2)}%
            </span>

        </div>

    `;

    item.addEventListener("click",()=>{

        if(marketState.currSymbol === stock.symbol) return ;

        marketState.currSymbol=stock.symbol;

        updateSelectedStock()

        document.dispatchEvent(new CustomEvent('stockChanged'))

    })

    return item;

}