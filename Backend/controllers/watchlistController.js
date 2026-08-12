// import Watchlist from "../models/watchlist.js";

// export async function getWatchlist(req, res) {

//     try {

//         const watchlist = await Watchlist.find({
//             userId: req.user._id
//         }).sort({
//             createdAt: -1
//         });

//         res.json({
//             watchlist
//         });

//     } catch (error) {

//         console.error(error);

//         res.status(500).json({
//             message: "Failed to fetch watchlist"
//         });
//     }
// }


// export async function addToWatchlist(req, res) {

//     try {

//         const { symbol, name } = req.body;

//         if (!symbol || !name) {
//             return res.status(400).json({
//                 message: "Symbol and name are required"
//             });
//         }

//         const watchlistItem = await Watchlist.create({

//             userId: req.user._id,

//             symbol,

//             name
//         });

//         res.status(201).json({

//             message: "Stock added to watchlist",

//             watchlistItem
//         });

//     } catch (error) {

//         if (error.code === 11000) {

//             return res.status(409).json({
//                 message: "Stock already in watchlist"
//             });
//         }

//         console.error(error);

//         res.status(500).json({
//             message: "Failed to add stock"
//         });
//     }
// }


// export async function removeFromWatchlist(req, res) {

//     try {

//         const symbol =
//             req.params.symbol.toUpperCase();

//         const deleted =
//             await Watchlist.findOneAndDelete({

//                 userId: req.user._id,

//                 symbol
//             });

//         if (!deleted) {

//             return res.status(404).json({
//                 message: "Stock not found in watchlist"
//             });
//         }

//         res.json({
//             message: "Stock removed from watchlist"
//         });

//     } catch (error) {

//         console.error(error);

//         res.status(500).json({
//             message: "Failed to remove stock"
//         });
//     }
// }