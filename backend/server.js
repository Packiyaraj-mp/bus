const express=require('express');
const dotenv=require('dotenv');
const path=require('path');
const cors=require('cors');
const app=require('./app');
const DbConnection = require('./dbConnection');

// assign path of env
dotenv.config({path:path.join(__dirname,'/config/config.env')});

// connection variables
const port=process.env.PORT;

// db connection
DbConnection();

// initialize cors
app.use(cors());
// create routes



app.listen(port,()=>{
    console.log(`server is connected in port number ${port} `)
});