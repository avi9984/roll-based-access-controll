import express, {Request,Response} from 'express';
const app=express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const PORT=process.env.PORT||3000;
dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL as string).then(()=>console.log('MongoDB is connected')).catch((err)=>console.log(err));


app.listen(PORT,()=>{
    console.log(`Server is listen in port http://localhost:${PORT}`);
});

