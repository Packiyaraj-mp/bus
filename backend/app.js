const express=require('express');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const dotenv=require('dotenv');
const path=require('path');
const GlobalErrorMiddleWare = require('./middileWares/globalErrorMiddleware');

const app=express();
app.use(cookieParser());
app.use(bodyParser.json({limit:'50mb'}));
// assign path of env
dotenv.config({path:path.join(__dirname,'/config/config.env')});

const userRoutes=require('./routes/UserRoutes');
const uploadRoutes=require('./routes/uploadRoutes');
const searchRoutes=require('./routes/SearchRoutes');
const friendsRoutes=require('./routes/FriendsRoutes');

app.use('/user',userRoutes);
app.use('/upload',uploadRoutes);
app.use('/search',searchRoutes);
app.use('/friend',friendsRoutes);


app.use(GlobalErrorMiddleWare);

module.exports=app;