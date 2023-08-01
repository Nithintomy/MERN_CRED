import express from 'express' 
import dotenv from 'dotenv'
dotenv.config();
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import { notFound,errorHandler } from './middleware/errormiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

connectDB();
const port =process.env.PORT ||5000;

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.use('/api/users',userRoutes);
app.use('/api/admin',adminRoutes)
app.use(notFound)
app.use(errorHandler)

app.get('/',(req,res)=>res.send('Sever is Ready'))

app.listen(port,()=>console.log(`server is Running on ${port}`))