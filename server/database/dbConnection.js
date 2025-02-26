import mongoose from 'mongoose';


export const connection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"MERN_Authentication"
    }).then(()=>{
        console.log('Connected to db');
    }).catch((e)=>{
        console.log(`Error in db connection ${e}`);
    })
}