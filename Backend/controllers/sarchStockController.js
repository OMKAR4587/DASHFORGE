import { searchStocks } from "../services/searchStock.js";
export async function searchStockController(req, res) {

    try {

        const { q } = req.query;
        console.log(q);
        console.log(typeof q);
        const stocks = await searchStocks(q);


        res.json(stocks);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

}