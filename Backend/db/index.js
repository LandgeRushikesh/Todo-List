import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`MongoDB Connected !!DB Host: ${connectionInstance.connection.host}`);

    }
    catch (err) {
        console.log(`MongoDB Connection error: ${err}`);
    }
}

export default connectDB