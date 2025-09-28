import mongoose from "mongoose";

if(!process.env.MONGODB_URL) {
    throw new Error('Please add your MongoDB URL to .env.local')
}

const MONGODB_URL = process.env.MONGODB_URL;

let cached = (global as any).mongoose || {conn: null, promise: null}

export async function connectDB() {
    if(cached.conn) return cached.conn; //if connection already exists returns it immediately

    if(!cached.promise) { //It checks if there's already a promise for a DB connection in progress
        cached.promise = mongoose.connect(MONGODB_URL, {
            dbName: "report-module",
            bufferCommands: false,  //disables buffering of operations before connection is established
        }).then(mongoose => mongoose)
    }

    //Wait for the connection to finish, then store and return it
    cached.conn = await cached.promise;
    return cached.conn;
}