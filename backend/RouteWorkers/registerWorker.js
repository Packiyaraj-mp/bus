const AsyncoronizeErrorHandler = require('../middileWares/AsyncoranizeErrorHandler');
const GlobalErrorClass = require('../middileWares/errorClass');
const UserModel=require('../mongoShema/userShema');
const sendToken = require('../utils/sendToken');


exports.registerWorker=AsyncoronizeErrorHandler(async(req,res,next)=>{
  const {name,email,password,confirm}=req.body;
 
  if(name&&email&&password&&confirm &&password===confirm){
  const user= new UserModel({
  name,
  email,
  password,
  });
  const newUser=await user.save();
  sendToken(newUser,200,res);
  }else{
    return next(new GlobalErrorClass(400,"invalid credentials"));
  }


  
 
  
  
  
});