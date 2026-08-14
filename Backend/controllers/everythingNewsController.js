import { getMarketNews } from "../services/everythingNews.js";

export async function getMarketController(req, res) {

    try {

        const news = await getMarketNews();

        res.json(news);

    } catch (error) {

        console.error(
            "Market news controller error:",
            error
        );

        res.status(500).json({
            message: "Failed to fetch market news"
        });
    }
}