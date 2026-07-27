export function newsSection(stock) {

    const card = document.createElement("section");

    card.className = "card news-card";

    card.innerHTML = `

        <h3 class="section-title">Latest News</h3>

        <div class="news-list">

            ${stock.news.map(news => `

                <article class="news-item">

                    <h4>${news.title}</h4>

                    <div class="news-meta">

                        <span>${news.source}</span>

                        <span>${news.date}</span>

                    </div>

                </article>

            `).join("")}

        </div>

    `;

    return card;

}