import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectionString = 'mongodb://admin:1234@localhost:27017/?authMechanism=DEFAULT'

const connectDb = async () => {
    try {   
        await mongoose.connect(connectionString, {
            dbName:'Mern',
        });
        console.log(`Db connected seccussfully`);
    }
    catch (err) {
        console.log(err)
        process.exit(1);
    }
}

export { connectDb };