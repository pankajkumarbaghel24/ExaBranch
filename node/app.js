const express=require('express');
const app =express();
const Joi=require('joi');
const config= require('config');
const dGroup = require('./router/deviceGroup');
const device_info=require('./router/device_info');
const location = require('./router/locations');
const cors =require('cors');

app.use(express.json());
app.use(cors());





app.use('/api/device',device_info);
app.use('/api/dGroup', dGroup);
app.use('/api/locations', location);


const port=5000;
app.listen(port,()=>{
    console.log(`listeing on port ${port}`)
    
})