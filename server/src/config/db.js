import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
const connectionString = process.env.MONGO_URI

const connectDb = async () => {
    try {   
        console.log('im here');
        await mongoose.connect('mongodb://localhost:27017');
        console.log(`Db connected seccussfully`);
    }
    catch (err) {
        process.exit(1);
    }
}

export { connectDb };