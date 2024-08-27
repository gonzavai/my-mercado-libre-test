import express from 'express';
import cors from 'cors';
import itemsRoutes from './routes/itemsRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', itemsRoutes);

app.use(errorHandler);  // Middleware para manejar errores

export default app;
