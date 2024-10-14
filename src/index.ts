import express from 'express';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const PORT = process.env.PORT || 3000;
dotenv.config();
import { logRequests } from './middleware/logging';
import userRoutes from './routes/user';
import adminRoutes from './routes/admin';

app.use(express.json());
app.use(logRequests);
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGO_URL as string).then(() => console.log('MongoDB is connected')).catch((err) => console.log(err));


app.use('/users', userRoutes);
app.use('/admins', adminRoutes);

app.listen(PORT, () => {
    console.log(`Server is listen in port http://localhost:${PORT}`);
});

