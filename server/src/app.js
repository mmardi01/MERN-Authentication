import express from 'express';
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import { connectDb } from './config/db.js';
import cors from 'cors'
import  cookieParser  from 'cookie-parser'
dotenv.config()

const port = process.env.PORT
const app = express();
connectDb();

app.use(express.json());
app.use(cors({
  origin: true,
}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use('/api/users',userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log('server is running on port', port);
});