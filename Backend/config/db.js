import mongoose from "mongoose";

export async function connectDb(params) {
    try {

        await mongoose.connect(`mongodb://${process.env.dbUsername}:${process.env.dbPassword}@ac-vkhugy1-shard-00-00.jm7u5hm.mongodb.net:27017,ac-vkhugy1-shard-00-01.jm7u5hm.mongodb.net:27017,ac-vkhugy1-shard-00-02.jm7u5hm.mongodb.net:27017/?ssl=true&replicaSet=atlas-auh8i0-shard-0&authSource=admin&appName=Cluster0`);
         console.log("mongodb connected");
        
    } catch (err) {
        console.error("mongo failed to connect", err.message);
        process.exit(1)
    }
}