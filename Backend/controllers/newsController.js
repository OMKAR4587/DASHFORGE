import { getNews } from "../services/newsService.js";

export async function newsController(req, res) {
    try {
        const { symbol } = req.query;
    
        const latestNews = await getNews(symbol);

        // console.log(latestNews)
        res.json(latestNews);

    } catch (err) {

        res.status(500).json({
            error: err.message
        })
    }
}