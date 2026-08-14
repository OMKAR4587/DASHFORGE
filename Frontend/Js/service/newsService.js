import { marketNews } from "../api/marketApi.js";

async function fetchStories() {

    const news = await marketNews();

    if (!Array.isArray(news)) {
        return [];
    }

    return news;
}


// =========================================================
// FORMAT NEWS DATA
// =========================================================

function formatStory(story) {

    return {

        title:
            story.title ||
            "Untitled story",

        publisher:
            story.publisher ||
            "Market News",

        link:
            story.link ||
            "#",

        image:
            story.thumbnail
                ?.resolutions
                ?.find(
                    item =>
                        item.width >= 300
                )
                ?.url ||
            story.thumbnail
                ?.resolutions
                ?.at(0)
                ?.url ||
            "",

        publishedAt:
            story.providerPublishTime
                ? new Date(
                    story.providerPublishTime
                )
                : null,

        tickers:
            Array.isArray(
                story.relatedTickers
            )
                ? story.relatedTickers
                : []
    };
}


// =========================================================
// PREPARE STORIES
// =========================================================

async function getStories() {

    try {

        const news =
            await fetchStories();

        return news.map(
            formatStory
        );

    } catch (error) {

        console.error(
            "Stories logic error:",
            error
        );

        throw error;
    }
}


// =========================================================
// EXPORT LOGICAL API
// =========================================================

export {
    fetchStories,
    formatStory,
    getStories
};