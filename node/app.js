const express=require('express');
const app =express();
const Joi=require('joi');
const config= require('config');
const cors =require('cors');

app.use(express.json());
app.use(cors());
const device_info=require('./router/device_info');




app.use('/api',device_info);


const port=5000;
app.listen(port,()=>{
    console.log(`listeing on port ${port}`)
    
})