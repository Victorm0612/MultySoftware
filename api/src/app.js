import express, { json } from 'express';
import cors from 'cors';
//importing routes
import bankRoutes from './routes/bank_routes';
import billRoutes from './routes/bill_routes'
import categoryRoutes from './routes/category_routes';
import discountRoutes from './routes/discount_routes';
import ingredientRoutes from './routes/ingredient_routes'
import restaurantRoutes from './routes/restaurant_routes';
import productRoutes from './routes/product_routes';
import saleRoutes from './routes/sale_routes';
import userRoutes from './routes/user_routes';
import authRoutes from './routes/auth_routes';
import cardRoutes from './routes/card_routes';
import cashPayRoutes from './routes/cashpay_routes';
import creditPayRoutes from './routes/creditpay_routes';
import debitPayRoutes from './routes/debitpay_routes';
import paymentRoutes from './routes/payment_routes';


// Initialization
const app = express();

//middlewares
app.use(json());
app.use(cors());

//routes
app.use('/api/bank', bankRoutes)
app.use('/api/bill', billRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/discount', discountRoutes);
app.use('/api/ingredient', ingredientRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/product', productRoutes);
app.use('/api/sale', saleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/card', cardRoutes);
app.use('/api/cashPay', cashPayRoutes);
app.use('/api/creditPay', creditPayRoutes);
app.use('/api/debitPay', debitPayRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/auth', authRoutes);


export default app;