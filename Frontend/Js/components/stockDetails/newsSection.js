function timeAgo(dateString) {

    if (!dateString) return "-";

    const date = new Date(dateString);

    const diff = Math.floor((Date.now() - date.getTime()) / 1000);

    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / 86400);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return date.toLocaleDateString();
}

export function newsSection(news = []) {

    const card = document.createElement("section");

    card.className = "card news-card";

    card.innerHTML = `

        <h3 class="section-title">Latest News</h3>

        <div class="news-list">

            ${!news.length
            ? `
                        <div class="news-empty">
                            No news available.
                        </div>
                    `
            : news.map(item => {

                const image =
                    item.thumbnail?.resolutions?.find(
                        img => img.tag === "140x140"
                    )?.url
                    ||
                    item.thumbnail?.resolutions?.[0]?.url
                    ||
                    "https://placehold.co/140x90?text=News";

                return `

                            <a
                                href="${item.link}"
                                target="_blank"
                                class="news-item">

                                <img
                                    src="${image}"
                                    class="news-image"
                                    alt="${item.title}"
                                />

                                <div class="news-content">

                                    <h4 class="news-title">
                                        ${item.title}
                                    </h4>

                                    <div class="news-meta">

                                        <span>${item.publisher}</span>

                                        <span>•</span>

                                        <span>${timeAgo(item.providerPublishTime)}</span>

                                    </div>

                                </div>

                            </a>

                        `;
            }).join("")
        }

        </div>

    `;

    return card;
}