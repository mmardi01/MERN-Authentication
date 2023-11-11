import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
const connectionString = process.env.MONGO_URI

const connectDb = async () => {
    try {   
        await mongoose.connect(connectionString);
        console.log(`Db connected seccussfully`);
    }
    catch (err) {
        process.exit(1);
    }
}

export { connectDb };