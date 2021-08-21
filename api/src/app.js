import express, { json } from 'express';
import cors from 'cors';
//importing routes
import categoryRoutes from './routes/category_routes';
import discountRoutes from './routes/discount_routes';
import restaurantRoutes from './routes/restaurant_routes';
import productRoutes from './routes/product_routes';
import saleRoutes from './routes/sale_routes';
import userRoutes from './routes/user_routes';
import authRoutes from './routes/auth_routes';

// Initialization
const app = express();

//middlewares
app.use(json());
app.use(cors());

//routes
app.use('/api/category',categoryRoutes);
app.use('/api/discount',discountRoutes);
app.use('/api/restaurant',restaurantRoutes);
app.use('/api/product',productRoutes);
app.use('/api/sale',saleRoutes);
app.use('/api/users',userRoutes);
app.use('/api/auth', authRoutes);


export default app;