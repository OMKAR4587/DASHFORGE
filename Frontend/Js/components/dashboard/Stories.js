import { getStories } from "../../service/newsService.js";



export async function Stories() {

    const stories =
        document.createElement("section");

    stories.classList.add(
        "stories"
    );

    stories.innerHTML = `
        <div class="stories-header">
            <div>
                <span class="stories-eyebrow">
                    MARKET NEWS
                </span>

                <h2>
                    Latest Stories
                </h2>

                <p>
                    Latest market-moving news and updates.
                </p>
            </div>

            <button
                class="stories-refresh"
                type="button"
            >
                Refresh
            </button>
        </div>

        <div class="stories-list">
            <div class="stories-loading">
                Loading latest stories...
            </div>
        </div>
    `;

    const list =
        stories.querySelector(
            ".stories-list"
        );

    const refreshBtn =
        stories.querySelector(
            ".stories-refresh"
        );


    async function loadStories() {

        list.innerHTML = `
            <div class="stories-loading">
                Loading latest stories...
            </div>
        `;

        try {

            const news =
                await getStories();

            if (!news.length) {

                list.innerHTML = `
                    <div class="stories-empty">
                        No market news available.
                    </div>
                `;

                return;
            }

            list.innerHTML =
                news
                    .map(
                        story => `
                            <article
                                class="story-card"
                                data-link="${story.link}"
                            >

                                <div class="story-image">

                                    ${
                                        story.image
                                            ? `
                                                <img
                                                    src="${story.image}"
                                                    alt=""
                                                    loading="lazy"
                                                >
                                            `
                                            : `
                                                <div
                                                    class="story-image-placeholder"
                                                >
                                                    NEWS
                                                </div>
                                            `
                                    }

                                </div>


                                <div class="story-content">

                                    <div class="story-meta">

                                        <span>
                                            ${story.publisher}
                                        </span>

                                        ${
                                            story.publishedAt
                                                ? `
                                                    <time>
                                                        ${story.publishedAt.toLocaleString()}
                                                    </time>
                                                `
                                                : ""
                                        }

                                    </div>


                                    <h3>
                                        ${story.title}
                                    </h3>


                                    <a
                                        class="story-read"
                                        href="${story.link}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Read story
                                        <span>↗</span>
                                    </a>

                                </div>

                            </article>
                        `
                    )
                    .join("");

        } catch (error) {

            console.error(
                "Failed to render stories:",
                error
            );

            list.innerHTML = `
                <div class="stories-error">

                    <strong>
                        Unable to load news
                    </strong>

                    <span>
                        Please try again later.
                    </span>

                </div>
            `;
        }
    }


    refreshBtn.addEventListener(
        "click",
        loadStories
    );


    await loadStories();


    return stories;
}