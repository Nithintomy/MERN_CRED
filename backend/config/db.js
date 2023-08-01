import mongoose from "mongoose";


const connectDB =async()=>{
    try{
        const connetDB = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected Successfully `)

    }catch(err){
        console.log("DB Not connected")
    }
}

export default connectDB;