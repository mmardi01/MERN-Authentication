import express from 'express';
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
dotenv.config()


const port = process.env.PORT
const app = express();


app.use('/api/users',userRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log('server is running on port', port);
});