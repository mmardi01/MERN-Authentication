import mongoose, { mongo } from 'mongoose';

const connectdb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  }
  catch(err) {
    console.log(`Error: ${err}`);
    process.exit(1); 
  }
}

export default connectdb;