import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectionString = process.env.CONNECTION_STRING

const connectDb = async () => {
    try {   
        await mongoose.connect(connectionString, {
            dbName:'Mern',
        });
        console.log(`Db connected seccussfully`);
    }
    catch (err) {
        // process.exit(1);
        console.log(err);
    }
}

export { connectDb };