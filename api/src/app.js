import express, { json } from 'express';

//importing routes
import userRoutes from './routes/user_route';

// Initialization
const app = express();

//middlewares
app.use(json());

//routes
app.use('/api/users',userRoutes);


export default app;