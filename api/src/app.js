import express, { json } from 'express';

//importing routes
import categoryRoutes from './routes/category_routes';
import discountRoutes from './routes/discount_routes';
import domicileRoutes from './routes/domicile_routes';
import productRoutes from './routes/product_routes';
import saleRoutes from './routes/sale_routes';
import userRoutes from './routes/user_routes';

// Initialization
const app = express();

//middlewares
app.use(json());

//routes
app.use('/api/category',categoryRoutes);
app.use('/api/discount',discountRoutes);
app.use('/api/domicile',domicileRoutes);
app.use('/api/product',productRoutes);
app.use('/api/sale',saleRoutes);
app.use('/api/users',userRoutes);


export default app;