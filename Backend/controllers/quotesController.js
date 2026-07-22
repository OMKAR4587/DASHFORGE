import { getStockQuotes } from "../services/getQuotesService.js";

export async function Quotes(req, res) {
    try {
        const symbols = req.query.symbols.split(",");
        const data = await getStockQuotes(symbols);

        res.json({
            success:true,
            data
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}