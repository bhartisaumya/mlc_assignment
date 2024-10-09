import mongoose from "mongoose";

const MONGO_URL: string = process.env.CONNECTION_STRING_CLOUD as string


mongoose.connect(MONGO_URL)
.then(() => {
    console.log("MongoDB Connected...")
})
.catch((err: Error) => {
    console.log(err.message);
})

process.on("beforeExit", () => {
    mongoose.disconnect();
    process.exit(0);
});