import {getStockHistory} from "../services/twelveData.js";

export async function history(req,res) {
    try{
        const symbol = req.query.symbol || "AAPL"
        const range = req.query.range || "1Y"
        const data = await getStockHistory(symbol, range)
        res.json(data)
        
    }catch(err){
        console.error
    res.status(500).json({
        success:false,
        message:err.message
    });
}
}