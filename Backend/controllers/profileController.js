import { getProfile } from "../services/profileService.js";

export async function profileController(req,res){
    const {symbol} = req.query;

    const Profile = await getProfile(symbol);
    res.json(Profile);
}